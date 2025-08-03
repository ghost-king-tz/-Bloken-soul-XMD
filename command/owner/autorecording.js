const { sendMessage } = require("@whiskeysockets/baileys");

module.exports = {
  name: "autorecording",
  alias: ["autorecord"],
  category: "owner",
  desc: "Auto Recording On/Off",
  isOwner: true,
  async run(m, { sock, args }) {
    const setting = args[0];
    if (!setting || !["on", "off"].includes(setting.toLowerCase())) {
      return m.reply("🎙️ *Usage:* autorecording on / off");
    }

    global.autorecording = setting.toLowerCase() === "on";
    return m.reply(`✅ AutoRecording is now *${setting.toUpperCase()}*`);
  },
};
