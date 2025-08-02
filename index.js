// index.js

const { Boom } = require('@hapi/boom'); const makeWASocket = require('@whiskeysockets/baileys').default; const { useSingleFileAuthState } = require('@whiskeysockets/baileys'); const fs = require('fs'); const config = require('./config.json'); const commands = require('./commands'); const menu = require('./menu'); const licenseCheck = require('./license');

// License protection if (!licenseCheck('+255719632816')) { console.log('This bot is locked to the owner number only.'); process.exit(1); }

const { state, saveState } = useSingleFileAuthState('./session.json');

async function startBot() { const sock = makeWASocket({ auth: state, printQRInTerminal: true, });

sock.ev.on('creds.update', saveState);

sock.ev.on('messages.upsert', async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
    const sender = msg.key.remoteJid;

    if (!text) return;

    if (text === '.menu') {
        await sock.sendMessage(sender, { text: menu() });
    }

    if (text.startsWith('.')) {
        const [cmd, ...args] = text.slice(1).split(' ');
        if (commands[cmd]) {
            await commands[cmd](sock, msg, args);
        }
    }
});

sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
        const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
        if (reason !== 401) startBot();
    }
});

}

startBot();


