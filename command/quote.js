const quotes = [
  "Don't give up!",
  "Work hard in silence, let success make the noise.",
  "Stay focused and never quit.",
  "You are stronger than you think.",
];
const handler = async (m) => {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  m.reply(`🌟 *Quote:* ${quote}`);
};
handler.help = ['quote'];
handler.tags = ['fun'];
handler.command = /^quote$/i;
export default handler;
