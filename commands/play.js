const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");

module.exports = {
    name: "play",
    description: "Play YouTube video",
    execute: async (sock, msg, args) => {
        if (!args.length) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .play despacito" });

        const search = await yts(args.join(" "));
        if (!search.videos.length) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Video not found" });

        const video = search.videos[0];
        const stream = ytdl(video.url, { filter: "audioandvideo", quality: "lowest" });

        const filePath = "./video.mp4";
        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);

        writeStream.on("finish", async () => {
            await sock.sendMessage(msg.key.remoteJid, { video: fs.readFileSync(filePath), caption: `🎬 ${video.title}` });
            fs.unlinkSync(filePath);
        });
    }
          }
