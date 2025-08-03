
const axios = require("axios");
const { isPremium } = require("../premium.json");

module.exports = {
  name: "anonymous",
  aliases: ["anonmsg", "sendanon"],
  description: "Tuma ujumbe bila kujulikana (Anonymous Message)",
  premium: true,
  category: "premium",
  async execute(m, { args, conn, sender, prefix, command }) {
    const user = sender;
    if (!isPremium.includes(user)) {
      return m.reply("⚠️ Feature hii ni ya Premium. Nunua premium kutumia:\n.menu premium");
    }

    const [number, ...msg] = args.join(" ").split("|");
    if (!number || !msg.length) {
      return m.reply(`📤 Tuma ujumbe kwa njia ya:\n${prefix + command} nambari|ujumbe\n\nMfano:\n${prefix + command} 255712345678|Habari yako?`);
    }

    const receiver = number.replace(/\D/g, "") + "@s.whatsapp.net";
    const message = msg.join(" ").trim();

    try {
      await conn.sendMessage(receiver, { text: `📩 Ujumbe kutoka kwa mtu asiyejulikana:\n\n${message}` });
      m.reply("✅ Ujumbe umetumwa bila kujulikana!");
    } catch (e) {
      console.error(e);
      m.reply("❌ Imeshindikana kutuma ujumbe. Hakikisha namba ni sahihi na WhatsApp iko hai.");
    }
  },
};
