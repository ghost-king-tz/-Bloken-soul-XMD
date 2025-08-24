const axios = require('axios');

module.exports = {
    name: 'imggenerate',
    description: 'Generate an AI image',
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.reply('Please provide a prompt for image generation!');
        const prompt = args.join(' ');
        try {
            const res = await axios.post('https://api.openai.com/v1/images/generations', {
                prompt: prompt,
                n: 1,
                size: "512x512"
            }, {
                headers: {
                    'Authorization': `Bearer YOUR_OPENAI_API_KEY`,
                    'Content-Type': 'application/json'
                }
            });
            const imageUrl = res.data.data[0].url;
            msg.reply(imageUrl);
        } catch(err) {
            msg.reply('Failed to generate image.');
        }
    }
    }
