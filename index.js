const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
const qrcode = require('qrcode-terminal'); // Hii ni mpya
require('dotenv').config();

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(process.env.SESSION_PATH || './session');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr } = update;

        if (qr) {
            console.log("🔗 QR Code: Scan hapa chini 👇");
            qrcode.generate(qr, { small: true }); // ina-print QR vizuri hata kwenye simu
        }

        if (connection === 'open') {
            console.log("✅ Bot connected as", sock.user.id);
        }

        if (connection === 'close') {const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                console.log("❌ Logged out. Delete session and restart.");
            } else {
                console.log("⚠️ Reconnecting...");
                startBot();
            }
        }
    });
}

startBot();
