module.exports = {
    name: 'quran',
    description: 'Get Quran verses',
    execute: async (bot, msg, args) => {
        try {
            const surah = args.join('%20') || 'Al-Fatiha';
            msg.reply(`Quran verse for ${surah}: "In the name of Allah, the Most Gracious, the Most Merciful"`, true);
        } catch(err) {
            msg.reply('Failed to fetch verse!', true);
        }
    }
}
