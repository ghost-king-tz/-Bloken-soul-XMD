export default {
  name: "autorecording",
  description: "Toggle bot autorecording status",
  async execute(bot, message, args) {
    const status = args[0];
    if(!status || !["on","off"].includes(status.toLowerCase())) 
      return message.reply("Use: autorecording on/off");

    bot.settings.autorecording = status.toLowerCase() === "on";
    message.reply(`Autorecording is now ${bot.settings.autorecording ? "enabled" : "disabled"}`);
  }
}
