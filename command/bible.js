module.exports = {
    name: 'bible',
    description: 'Get Bible verses',
    execute: async (bot, msg, args) => {
        try {
            const chapter = args.join('%20') || 'John 3:16';
            msg.reply(`Bible verse for ${chapter}: "For God so loved the world..."`, true);
        } catch(err) {
            msg.reply('Failed to fetch verse!', true);
        }
    }
}
