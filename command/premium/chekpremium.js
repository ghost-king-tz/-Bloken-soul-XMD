const premium = require('../../premium.json');

module.exports = {
  name: 'checkpremium',
  alias: ['ispremium'],
  description: 'Angalia kama user ni premium au la',
  category: 'premium',
  async run({ m, args }) {
    const number = args[0]?.replace(/\D/g, '') || m.sender.split('@')[0];
    const isPremium = premium.includes(number);
    if (isPremium) {
      m.reply(`✅ ${number} ni premium user.`);
    } else {
      m.reply(`❌ ${number} SIYO premium user.`);
    }
  }
};
