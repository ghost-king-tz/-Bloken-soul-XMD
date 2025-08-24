export default {
  name: "help",
  description: "Show help menu with owner contact",
  async execute(bot, message) {
    let menu = "📜 *Available commands*:\n";
    bot.commands.forEach(cmd => menu += `- ${cmd.name}\n`);
    menu += `\nFor help contact owner:\n`;
    menu += `Name: 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝\n`;
    menu += `Number: +255719632816`;
    message.reply(menu);
  }
}
