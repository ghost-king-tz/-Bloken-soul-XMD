const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const pino = require('pino');
require('dotenv').config();

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(process.env.SESSION_PATH || './session');

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;

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

    // PAIRING CODE METHODconsole.log("🔗 Bot not registered. Scan QR code or pair it.");
    }
}

startBoconsole.log("🔗 Bot not registered. Scan QR code or pair it.");
    }
}

startBot();

    if (!sock.authState.creds.registered) {
