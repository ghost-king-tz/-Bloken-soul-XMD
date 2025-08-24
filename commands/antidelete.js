export default {
  name: "antidelete",
  description: "Enable/disable anti-delete messages",
  async execute(bot, message, args) {
    const value = args[0]?.toLowerCase();
    if (!["on", "off"].includes(value)) return message.reply("Use: on/off");

    bot.settings.antidelete = value === "on";
    message.reply(`Anti-delete messages is now ${value}`);
  }
}
