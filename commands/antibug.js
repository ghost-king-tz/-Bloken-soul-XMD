export default {
  name: "antibug",
  description: "Enable or disable bot antibug protection",
  async execute(bot, message, args) {
    const status = args[0]; // on/off
    if(!status || !["on","off"].includes(status.toLowerCase())) 
      return message.reply("Use: antibug on/off");

    bot.settings.antibug = status.toLowerCase() === "on";
    message.reply(`Antibug is now ${bot.settings.antibug ? "enabled" : "disabled"}`);
  }
}
