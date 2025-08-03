module.exports = {
  name: 'kick',
  alias: ['remove'],
  category: 'group',
  desc: 'Kick a member from the group',
  use: '@tag',
  premium: false,
  group: true,
  admin: true,
  botAdmin: true,

  async exec({ sock, m, args }) {
    const mentioned = m.mentionedJid;

    if (!mentioned[0]) {
      return m.reply('❌ Tag mtu unayetaka kumtoa kwenye group!');
    }

    try {
      await sock.groupParticipantsUpdate(m.chat, [mentioned[0]], 'remove');
      await m.reply(`✅ Member ametolewa kwenye group.`);
    } catch (e) {
      await m.reply(`⚠️ Imeshindikana kumtoa member: ${e.message}`);
    }
  },
};
