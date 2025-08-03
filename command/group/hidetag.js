module.exports = {
  name: 'hidetag',
  category: 'group',
  desc: 'Tuma ujumbe kwa wote bila ku-tag moja moja',
  use: '<message>',
  premium: false,
  group: true,
  admin: true,
  botAdmin: true,

  async exec({ sock, m, args }) {
    if (!args.length) return m.reply('⚠️ Andika ujumbe wa kutuma.');

    try {
      const groupMetadata = await sock.groupMetadata(m.chat);
      const participants = groupMetadata.participants.map((p) => p.id);

      await sock.sendMessage(m.chat, {
        text: args.join(' '),
        mentions: participants,
      });

      await m.react('✅');
    } catch (e) {
      await m.reply(`❌ Imeshindikana kutuma ujumbe: ${e.message}`);
    }
  },
};
