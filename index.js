require('dotenv').config();
const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const { DisconnectReason, makeInMemoryStore } = require("@whiskeysockets/baileys");
const P = require("pino");

const startBot = async () => {
  const { state, saveCreds } = await useMultiFileAuthState("session");

  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message) return;

    const type = Object.keys(msg.message)[0];
    const body = (type === 'conversation') ? msg.message.conversation : '';
    
    if (body === "!alive") {
      await sock.sendMessage(msg.key.remoteJid, { text: "✅ Bot is alive and running!" }, { quoted: msg });
    }
  });
};

startBot();
