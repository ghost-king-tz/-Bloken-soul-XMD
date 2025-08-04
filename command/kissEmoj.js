js
const kissEmojis = [
  '😘', '😚', '😙', '😽', '💋', '👩‍❤️‍💋‍👨',
  '💏', '💖', '❤️', '💘', '😻'
];

module.exports = {
  name: 'kiss',
  description: 'Send a random kiss emoji',
  execute: async (client, message) => {
    const randomEmoji = kissEmojis[Math.floor(Math.random() * kissEmojis.length)];
    client.sendMessage(message.from, { text: randomEmoji });
  }
};
