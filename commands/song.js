const ytdl = require("ytdl-core");
const yts = require("yt-search");
const fs = require("fs");

module.exports = {
    name: "song",
    description: "Download song from YouTube",
    execute: async (sock, msg, args) => {
        if (!args.length) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .song despacito" });
        
        const search = await yts(args.join(" "));
        if (!search.videos.length) return sock.sendMessage(msg.key.remoteJid, { text: "❌ Song not found" });

        const video = search.videos[0];
        const stream = ytdl(video.url, { filter: "audioonly" });

        const filePath = "./song.mp3";
        const writeStream = fs.createWriteStream(filePath);
        stream.pipe(writeStream);

        writeStream.on("finish", async () => {
            await sock.sendMessage(msg.key.remoteJid, { audio: fs.readFileSync(filePath), mimetype: "audio/mpeg" });
            fs.unlinkSync(filePath);
        });
    }
          }
