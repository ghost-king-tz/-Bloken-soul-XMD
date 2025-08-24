export default {
  name: "warn",
  description: "Warn a user, take action if warns exceed limit",
  async execute(bot, message, args) {
    const user = args[0];
    if (!user) return message.reply("Specify a user to warn");

    const reason = args.slice(1).join(" ") || "No reason provided";
    bot.warns[user] = (bot.warns[user] || 0) + 1;

    const warnsLeft = 3 - bot.warns[user];
    message.reply(`@${user} you have been warned.\nReason: ${reason}\nWarns: ${bot.warns[user]}/3`);

    // Action if warns exceed 3
    if (bot.warns[user] >= 3) {
      if (message.isGroup) {
        // Kick user from group
        await bot.kick(message.groupId, user);
        message.reply(`@${user} has been kicked from the group for repeated warnings.`);
      } else {
        // DM / private: block user
        await bot.blockUser(user);
        message.reply(`@${user} has been blocked due to repeated warnings.`);
      }
      // Reset warns
      bot.warns[user] = 0;
    } else {
      message.reply(`You have ${warnsLeft} warns left before action.`);
    }
  }
}
