const axios = require('axios');

module.exports = {
    name: 'weather',
    description: 'Get weather info for a city',
    execute: async (bot, msg, args) => {
        if(!args[0]) return msg.reply('Please provide a city name!');
        const city = args.join(' ');
        try {
            const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY'; // weka API key yako
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = res.data;
            msg.reply(`Weather in ${data.name}: ${data.weather[0].description}, Temp: ${data.main.temp}°C`);
        } catch(err) {
            msg.reply('City not found or error occurred!');
        }
    }
              }
