const handler = async (m) => {
  const d = new Date();
  const time = d.toLocaleTimeString('en-TZ');
  const date = d.toLocaleDateString('en-TZ');
  m.reply(`🕒 Time: ${time}\n📆 Date: ${date}`);
};
handler.help = ['time'];
handler.tags = ['tools'];
handler.command = /^time$/i;
export default handler;
