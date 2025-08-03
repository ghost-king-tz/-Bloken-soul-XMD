const { sendMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "autotyping",
  alias: ["autotype"],
  category: "owner",
  desc: "Auto Typing On/Off",
  isOwner: true,
  async run(m, { sock, args }) {
    const setting = args[0];
    if (!setting || !["on", "off"].includes(setting.toLowerCase())) {
      return m.reply("🛠️ *Usage:* autotyping on / off");
    }

    global.autotyping = setting.toLowerCase() === "on";
    return m.reply(`✅ AutoTyping is now *${setting.toUpperCase()}*`);
  },
};
