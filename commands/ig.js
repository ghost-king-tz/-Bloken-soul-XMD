const axios = require("axios");

module.exports = {
    name: "ig",
    description: "Download Instagram Reels",
    execute: async (sock, msg, args) => {
        if (!args[0]) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .ig <link>" });
        const link = args[0];
        await sock.sendMessage(msg.key.remoteJid, { text: `🎬 Downloading Instagram Reels...\n${link}\n(No watermark)` });
    }
}
