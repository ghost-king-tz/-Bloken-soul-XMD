// premium/premiumlist.js
const premium = require('../../premium.json');

module.exports = {
  name: 'premiumlist',
  category: 'Premium',
  desc: 'Orodha ya watu wenye premium access',
  async execute(msg, conn) {
    if (premium.length === 0) return msg.reply('🚫 Hakuna mtu yeyote mwenye premium');
    const list = premium.map((id, i) => `${i + 1}. wa.me/${id.split('@')[0]}`).join('\n');
    msg.reply(`📜 Orodha ya Premium Users:\n\n${list}`);
  },
};
