module.exports = {
  name: "autoreactstatus",
  description: "Turn on/off auto react to status",
  category: "owner",
  async run(client, m, args) {
    if (!client.isCreator) return m.reply("Hii command ni ya owner tu.");

    client.autoreactstatus = !client.autoreactstatus;
    m.reply(`❤️ Auto React to Status now ${client.autoreactstatus ? "ENABLED" : "DISABLED"}`);
  }
};
