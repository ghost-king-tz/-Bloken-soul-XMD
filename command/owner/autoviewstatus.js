const { exec } = require("child_process");

module.exports = {
  name: "autoviewstatus",
  description: "Turn on/off auto view status",
  category: "owner",
  async run(client, m, args, prefix, command) {
    const setting = await client.groupMetadata(m.chat).catch(() => {});
    if (!client.isCreator) return m.reply("Hii command ni ya owner tu.");
    
    client.autoview = !client.autoview;
    m.reply(`✅ Auto View Status now ${client.autoview ? "ENABLED" : "DISABLED"}`);
  }
};
