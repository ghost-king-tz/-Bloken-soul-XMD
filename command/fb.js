const { facebook } = require('@xct007/frieren-scraper');
const { default: axios } = require('axios');

module.exports = {
  name: "fb",
  alias: ["facebook", "fbvideo"],
  desc: "Download Facebook Video",
  category: "Download",
  usage: "fb <Facebook Video URL>",
  react: "📽️",
  async execute(client, message, args) {
    try {
      if (!args[0]) {
        return message.reply("⚠️ Tafadhali weka link ya video ya Facebook!\n\nMfano: .fb https://www.facebook.com/watch/?v=XXXXXXXXXX");
      }

      const url = args[0];
      const res = await facebook.v1(url);

      if (!res || !res.videoUrl) {
        return message.reply("🚫 Samahani, siwezi pakua video hiyo. Hakikisha link ni sahihi na video ipo public.");
      }

      const vidUrl = res.videoUrl;

      message.reply("⏬ Inapakua video, subiri kidogo...");
      await client.sendMessage(message.from, { video: { url: vidUrl }, caption: "✅ Video yako ya Facebook iko hapa!" }, { quoted: message });

    } catch (err) {
      console.error(err);
      message.reply("❌ Hitilafu imetokea wakati wa kupakua video ya Facebook.");
    }
  }
};
