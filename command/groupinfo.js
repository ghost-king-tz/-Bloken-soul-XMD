const handler = async (m, { conn, groupMetadata }) => {
  if (!m.isGroup) return m.reply('⛔ Hii command ni kwa magroup tu.');
  let info = `📌 *Group Info:*
- Name: ${groupMetadata.subject}
- ID: ${m.chat}
- Participants: ${groupMetadata.participants.length}
- Description: ${groupMetadata.desc || 'No description'}`;
  m.reply(info);
};
handler.help = ['groupinfo'];
handler.tags = ['group'];
handler.command = /^groupinfo$/i;
handler.group = true;
export default handler;
