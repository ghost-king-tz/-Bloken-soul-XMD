const fs = require('fs');
const premium = require('../../premium.json');

module.exports = {
  name: 'delpremium',
  alias: ['removepremium'],
  description: 'Futa user kutoka kwenye premium',
  category: 'premium',
  async run({ m, args, prefix, command }) {
    const number = args[0]?.replace(/\D/g, '');
    if (!number) return m.reply(`⚠️ Tumia: ${prefix + command} 255xxxxxxxxx`);

    const index = premium.indexOf(number);
    if (index !== -1) {
      premium.splice(index, 1);
      fs.writeFileSync('./premium.json', JSON.stringify(premium, null, 2));
      m.reply(`✅ ${number} ameondolewa kwenye premium.`);
    } else {
      m.reply(`❌ ${number} haipo kwenye premium list.`);
    }
  }
};
