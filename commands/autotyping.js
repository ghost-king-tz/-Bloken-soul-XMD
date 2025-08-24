export default {
  name: "autotyping",
  description: "Toggle bot autotyping status",
  async execute(bot, message, args) {
    const status = args[0];
    if(!status || !["on","off"].includes(status.toLowerCase())) 
      return message.reply("Use: autotyping on/off");

    bot.settings.autotyping = status.toLowerCase() === "on";
    message.reply(`Autotyping is now ${bot.settings.autotyping ? "enabled" : "disabled"}`);
  }
}
