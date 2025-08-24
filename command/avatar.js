const axios = require('axios');

module.exports = {
    name: 'avatar',
    description: 'Generate an avatar from a name',
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.reply('Please provide a name!');
        const name = args.join(' ');
        try {
            const res = await axios.get(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random&size=512`);
            msg.reply(res.data.url || res.request.res.responseUrl);
        } catch(err) {
            msg.reply('Could not generate avatar.');
        }
    }
}
