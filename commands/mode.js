export default {
  name: "mode",
  description: "Switch bot mode: private or public",
  async execute(bot, message, args) {
    const newMode = args[0]?.toLowerCase();
    if (!["private", "public"].includes(newMode)) 
      return message.reply("Specify mode: private or public");

    bot.settings.mode = newMode;
    message.reply(`Bot mode switched to: ${newMode}`);
  }
}
