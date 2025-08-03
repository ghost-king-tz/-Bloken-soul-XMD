const handler = async (m, { conn }) => {
  await m.reply("🟢 Bot is online and working!");
};
handler.help = ['ping'];
handler.tags = ['info'];
handler.command = /^ping$/i;
export default handler;
