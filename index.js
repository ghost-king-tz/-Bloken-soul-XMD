const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const { Boom } = require('@hapi/boom');
const fs = require('fs');
const { exec } = require('child_process');
const config = require('./config.json');

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('session');
  const sock = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on('creds.update', saveCreds);

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === 'open') {
      console.log('✅ BOT Connected!');
      sock.sendMessage(config.ownerNumber + '@s.whatsapp.net', {
        text: `*Owner ${config.ownerName} connected successfully. Press menu to see all commands.*`,
      });
    }
  });

  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    const msg = messages[0];
    if (!msg.message) return;
    const text = msg.message.conversation || msg.message.extendedTextMessage?.text;

    // Command handling
    if (text === 'menu') {
      const menu = fs.readFileSync('./menu/menu.txt', 'utf-8');
      await sock.sendMessage(msg.key.remoteJid, { text: menu }, { quoted: msg });
    }
  });
}

startBot();
