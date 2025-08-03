const axios = require("axios");
const { default: makeWASocket } = require("@adiwajshing/baileys");

module.exports = {
  name: "meme",
  alias: ["randommeme", "memez"],
  desc: "Get a random meme from the internet",
  category: "fun",
  usage: "meme",
  premium: false,
  async exec({ sock, m }) {
    try {
      const response = await axios.get("https://meme-api.com/gimme");
      const meme = response.data;

      await sock.sendMessage(m.chat, {
        image: { url: meme.url },
        caption: `🖼️ *${meme.title}*\n\n👍 ${meme.ups} upvotes | 📎 ${meme.postLink}`,
      });
    } catch (e) {
      await sock.sendMessage(m.chat, {
        text: "🥲 Samahani, siwezi kupata meme kwa sasa. Jaribu tena baadaye!",
      });
    }
  },
};
