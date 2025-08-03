module.exports = {
  name: 'tagall',
  category: 'group',
  desc: 'Tag wote wanachama wa group',
  premium: false,
  group: true,
  admin: true,
  botAdmin: false,

  async exec({ sock, m }) {
    try {
      const groupMetadata = await sock.groupMetadata(m.chat);
      const participants = groupMetadata.participants.map((p) => p.id);

      let text = `👥 *Tagging all members (${participants.length}):*\n\n`;
      for (const participant of participants) {
        text += `@${participant.split('@')[0]} `;
      }

      await sock.sendMessage(m.chat, {
        text,
        mentions: participants,
      });

      await m.react('✅');
    } catch (e) {
      await m.reply(`❌ Imeshindikana kutuma tagall: ${e.message}`);
    }
  },
};
