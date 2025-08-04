const { default: makeWASocket, MessageType, Mimetype } = require("@whiskeysockets/baileys");
const fs = require("fs");
const axios = require("axios");

module.exports = {
  name: "alive",
  description: "Shows bot is online with a video",
  type: "general",
  async execute(sock, m, args) {
    const videoUrl = "https://files.catbox.moe/n0wmyo.mp4";
    const audioUrl = "https://files.catbox.moe/8cjj1c.mp3";

    try {
      // Download video
      const video = await axios.get(videoUrl, { responseType: 'arraybuffer' });
      const audio = await axios.get(audioUrl, { responseType: 'arraybuffer' });

      // Save temporary files
      fs.writeFileSync('./temp_video.mp4', video.data);
      fs.writeFileSync('./temp_audio.mp3', audio.data);

      const { execSync } = require("child_process");
      execSync('ffmpeg -y -i ./temp_video.mp4 -i ./temp_audio.mp3 -c:v copy -c:a aac ./alive_final.mp4');

      const media = fs.readFileSync('./alive_final.mp4');

      await sock.sendMessage(m.chat, {
        video: media,
        mimetype: 'video/mp4',
        caption: `✨ 𝔅𝔬𝔱 𝔦𝔰 𝔄𝔩𝔦𝔳𝔢 ✨\n🤖 Powered by 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝-XMD`
      }, { quoted: m });

      // Cleanup temp files
      fs.unlinkSync('./temp_video.mp4');
      fs.unlinkSync('./temp_audio.mp3');
      fs.unlinkSync('./alive_final.mp4');

    } catch (error) {
      console.error("Alive Error:", error);
      await sock.sendMessage(m.chat, { text: "❌ Failed to send alive video." }, { quoted: m });
    }
  }
};
