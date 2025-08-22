const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(process.env.SESSION_PATH || './session');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false, // tuta-print kwa qrcode-terminal badala yake
        auth: state
    });

    // save credentials
    sock.ev.on('creds.update', saveCreds);

    // connection updates
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log("🔗 QR Code: Scan hapa chini 👇");
            qrcode.generate(qr, { small: true });
        }

        if (connection === 'open') {
            console.log("✅ Bot connected as", sock.user.id);
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Logged out. Delete session and restart.");
            } else {
                console.log("⚠️ Reconnecting...");
                startBot();
            }
        }
    });

    // message handler
    sock.ev.on('messages.upsert', async (m) => {
        const msg = m.messages[0];
        if (!msg.message) return;

        const from = msg.key.remoteJid;
        const body = msg.message.conversation ||
                     msg.message.extendedTextMessage?.text ||
                     msg.message.imageMessage?.caption ||
                     "";

        console.log("📩 Message from", from, ":", body);

        // Commands
        switch (body.toLowerCase()) {
            case "!menu":
                await sock.sendMessage(from, { text: 
`🌀 *Broken Soul XMD MENU* 🌀

✨ !menu - show this menu
✨ !ping - test bot
✨ !owner - owner info
✨ !ai <text> - ask AI
✨ !group - group info

╰─❖ ᴮʳᵒᵏᵉⁿ ˢᵒᵘˡ ˣᴹᴰ ❖─╯` 
                });
                break;

            case "!ping":
                await sock.sendMessage(from, { text: "🏓 Pong! Bot is alive ✅" });
                break;

            case "!owner":
                await sock.sendMessage(from, { text: "👑 Owner: Broken Soul\n📞 +255719632816" });
                break;

            case "!group":
                await sock.sendMessage(from, { text: "📌 Group commands coming soon! (kick, add, tagall...)" });
                break;

            default:
                // simple AI response (demo)
                if (body.startsWith("!ai ")) {
                    const question = body.slice(4);
                    await sock.sendMessage(from, { text: `🤖 AI says: ${question}? Hmmm... that's interesting!` });
                }
                break;
        }
    });
}

startBot();
