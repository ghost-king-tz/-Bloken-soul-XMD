const fs = require("fs");
const blocked = require("../lib/blocked.json");

module.exports = {
  name: "block",
  description: "Zuia mtumiaji asitumie bot",
  category: "owner",
  premium: false,
  async execute(client, m, args, isOwner) {
    if (!isOwner) return m.reply("⛔ Hii command ni ya owner tu!");

    const number = args[0]?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    if (!number) return m.reply("❌ Tafadhali taja namba mfano: .block 255712345678");

    if (blocked.includes(number)) return m.reply("⚠️ Namba hii tayari imezuiwa.");

    blocked.push(number);
    fs.writeFileSync("./lib/blocked.json", JSON.stringify(blocked, null, 2));

    m.reply(`✅ Namba ${args[0]} imezuiwa kutumia bot.`);
  },
};
