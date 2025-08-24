const yts = require("yt-search");

module.exports = {
    name: "play",
    description: "Search YouTube video",
    execute: async (sock, msg, args) => {
        if (!args.length) {
            return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .play despacito" });
        }

        const search = await yts(args.join(" "));
        if (!search.videos.length) {
            return sock.sendMessage(msg.key.remoteJid, { text: "❌ Video not found" });
        }

        const video = search.videos[0];

        const message = `🎬 *video.title*📺{video.url}\n⏱ Duration: video.timestamp👁 Views:{video.views}`;

        await sock.sendMessage(msg.key.remoteJid, {
            image: { url: video.thumbnail },
            caption: message
        });
    }
};
