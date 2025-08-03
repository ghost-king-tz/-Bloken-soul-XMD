const { readFileSync, writeFileSync } = require("fs");
const premium = JSON.parse(readFileSync("./premium.json"));

module.exports = {
  name: "addpremium",
  description: "Ongeza premium user",
  category: "premium",
  premium: false,
  execute: async ({ sock, m, args }) => {
    const number = args[0];
    if (!number) return m.reply("⚠️ Ingiza namba ya mtumiaji (mfano: 255712345678)");
    if (!premium.includes(number)) {
      premium.push(number);
      writeFileSync("./premium.json", JSON.stringify(premium));
      m.reply(`✅ ${number} ameongezwa kwenye premium`);
    } else {
      m.reply(`ℹ️ ${number} tayari ni premium`);
    }
  },
};
