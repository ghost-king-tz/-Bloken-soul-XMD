export default {
  name: "autoviewstatus",
  description: "Enable/disable auto view of status",
  async execute(bot, message, args) {
    const value = args[0]?.toLowerCase();
    if (!["on", "off"].includes(value)) return message.reply("Use: on/off");

    bot.settings.autoviewstatus = value === "on";
    message.reply(`Auto view status is now ${value}`);
  }
}
