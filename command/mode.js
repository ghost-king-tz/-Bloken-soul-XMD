const fs = require("fs");
const config = require("../config.json");

module.exports = {
  name: "mode",
  description: "Badilisha mode ya bot (public/private/self)",
  category: "owner",
  premium: false,
  async execute(client, m, args, isOwner) {
    if (!isOwner) return m.reply("⛔ Hii command ni ya owner tu!");

    const mode = args[0]?.toLowerCase();
    if (!["public", "private", "self"].includes(mode))
      return m.reply("❌ Tafadhali taja mode: public / private / self");

    config.mode = mode;
    fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));

    m.reply(`✅ Mode imebadilishwa kuwa *${mode.toUpperCase()}*`);
  },
};
