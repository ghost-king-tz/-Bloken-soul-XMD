const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const pino = require('pino');
const { exec } = require('child_process');
const path = require('path');

// Load config
const config = require('./config.json');
const menu = require('./menu/menu');

// ALIVE VIDEO & AUDIO FILE
const aliveVideo = fs.readFileSync('./media/alive.mp4');
const aliveAudio = fs.readFileSync('./media/alive.mp3');

// Start bot
async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('session');

    const sock = makeWASocket({
        auth: state,
        printQRInTerminal: true,
        logger: pino({ level: 'silent' }),
        browser: ['Broken Soul-XMD', 'Safari', '1.0.0'],
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text || '';

        if (text.toLowerCase() === 'alive') {
            await sock.sendMessage(from, {
                video: aliveVideo,
                gifPlayback: true,
                caption: `╭─────────────◆\n│ *🤖 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝-XMD Alive!*\n│\n│ 👑 Owner: ${config.ownerName}\n│ 📞 Contact: ${config.ownerNumber}\n╰─────────────◆`
            });

            await sock.sendMessage(from, {
                audio: aliveAudio,
                mimetype: 'audio/mp4',
                ptt: true,
            });
        }

        // Add more commands here if needed
    });

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect.error)?.output?.statusCode;
            if (reason === DisconnectReason.loggedOut) {
                console.log('Logged out. Delete session and restart.');
                fs.rmSync('./session', { recursive: true, force: true });
                process.exit(0);
            } else {
                startBot(); // reconnect
            }
        }
    });
}

startBot();
