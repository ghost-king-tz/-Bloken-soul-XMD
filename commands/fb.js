const axios = require("axios");

module.exports = {
    name: "fb",
    description: "Download Facebook video",
    execute: async (sock, msg, args) => {
        if (!args[0]) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .fb <link>" });
        const link = args[0];
        // Demo: hapa unaweza weka FB API
        await sock.sendMessage(msg.key.remoteJid, { text: `🎬 Downloading Facebook video...\n${link}\n(No watermark)` });
    }
}
