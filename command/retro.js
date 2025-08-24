const axios = require('axios');

module.exports = {
    name: 'retro',
    description: 'Generate 1988 style name image',
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.reply('Provide a name, e.g., 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝 1988');
        const name = args.join(' ');
        try {
            const res = await axios.get(`https://some-retro-api.com/generate?text=${encodeURIComponent(name)}&year=1988`);
            msg.reply(res.data.imageUrl); // API itarudisha image URL
        } catch(err) {
            msg.reply('Could not generate retro image.');
        }
    }
}
