const fs = require("fs");
const premium = require("../../premium.json");

module.exports = {
  name: "ban",
  description: "Ban mtumiaji asiwe premium",
  category: "owner",
  premium: false,
  async execute(client, m, args, isOwner) {
    if (!isOwner) return m.reply("⛔ Hii command ni ya owner tu!");

    const number = args[0]?.replace(/[^0-9]/g, "") + "@s.whatsapp.net";
    if (!number) return m.reply("❌ Tafadhali weka namba mfano: .ban 255712345678");

    if (!premium.includes(number)) return m.reply("⚠️ Namba hii siyo premium tayari.");

    const index = premium.indexOf(number);
    premium.splice(index, 1);

    fs.writeFileSync("./premium.json", JSON.stringify(premium, null, 2));
    m.reply(`✅ ${args[0]} amebanwa kwenye features za premium.`);
  },
};
