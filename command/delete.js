module.exports = {
    name: 'delete',
    description: 'Delete a message',
    execute: async (bot, msg, args) => {
        try {
            await bot.deleteMessage(msg.key.remoteJid, {id: msg.key.id});
            msg.reply('Message deleted!', true);
        } catch(err) {
            msg.reply('Failed to delete message', true);
        }
    }
}
