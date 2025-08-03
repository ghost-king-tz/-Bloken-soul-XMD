
const fs = require("fs");
const premiumUsers = JSON.parse(fs.readFileSync("./premium.json"));

module.exports = {
  name: "capcut",
  alias: ["capcutpro", "ccunlock"],
  category: "premium",
  desc: "CapCut Premium Unlock - Templates, Effects, APK Download",
  usage: ".capcut",
  react: "🎬",

  start: async (Miku, m, { prefix }) => {
    const sender = m.sender;

    if (!premiumUsers.includes(sender)) {
      return m.reply("⛔ Hii command ni ya Premium tu.\nNunua premium kwa kumtumia ujumbe Owner.\n\n📞 Owner: +255719632816");
    }

    let capcutMessage = `
🎬 *CapCut Premium Unlock* 💎

📁 Resources Available:
- 🔓 Premium Templates
- ✨ Extra Effects & Filters
- 🎞️ Video Transitions
- 📥 APK CapCut Mod (if needed)

📎 Links:
🌐 Templates: https://www.capcut.com/template
🔗 Mod APK (vLatest): https://bit.ly/CapCut-Premium-XMD

⚠️ Ikiwa link haitafunguka, tumia VPN au wasiliana na Owner kwa msaada zaidi.
`;

    Miku.sendMessage(m.from, { text: capcutMessage }, { quoted: m });
  }
};
