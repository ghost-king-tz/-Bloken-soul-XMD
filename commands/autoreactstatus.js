export default {
  name: "autoreactstatus",
  description: "Enable/disable auto react to status",
  async execute(bot, message, args) {
    const value = args[0]?.toLowerCase();
    if (!["on", "off"].includes(value)) return message.reply("Use: on/off");

    bot.settings.autoreactstatus = value === "on";
    message.reply(`Auto react to status is now ${value}`);
  }
}
