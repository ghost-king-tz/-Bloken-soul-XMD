const ytdl = require('ytdl-core');
const fs = require('fs');
const { tmpdir } = require('os');
const { join } = require('path');

module.exports = {
  name: "ytmp3",
  description: "Pakua sauti kutoka YouTube kwa kutumia link 🎶",
  async execute(sock, m, args) {
    const url = args[0];

    if (!url || !url.includes("youtube.com") && !url.includes("youtu.be")) {
      return sock.sendMessage(m.chat, { text: "❌ Tafadhali weka link sahihi ya YouTube.\n\nMfano:\n*.ytmp3 https://youtu.be/video_id*" }, { quoted: m });
    }

    try {
      const info = await ytdl.getInfo(url);
      const title = info.videoDetails.title.replace(/[^\w\s]/gi, '');
      const filePath = join(tmpdir(), `${title}.mp3`);
      const stream = ytdl(url, { filter: 'audioonly' });

      stream.pipe(fs.createWriteStream(filePath))
        .on("finish", async () => {
          await sock.sendMessage(m.chat, {
            document: fs.readFileSync(filePath),
            mimetype: 'audio/mpeg',
            fileName: `${title}.mp3`
          }, { quoted: m });
          fs.unlinkSync(filePath);
        });

    } catch (err) {
      console.error(err);
      return sock.sendMessage(m.chat, { text: "⚠️ Imeshindikana kupakua. Hakikisha link ni sahihi au jaribu tena baadae." }, { quoted: m });
    }
  }
};
