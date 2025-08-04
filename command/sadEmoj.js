js
const sadEmojis = [
  '😢', '😭', '😞', '😔', '😟', '😿',
  '💔', '😩', '😫', '😣', '😖', '🥀',
  '🥹', '😓', '😥', '😮‍💨', '😶‍🌫️',
  '🙍‍♂️', '🙍‍♀️', '🫤', '🫥', '😨',
  '😰', '😱', '😬', '😓'
];

module.exports = {
  name: 'sad',
  description: 'Send a random sad emoji',
  execute: async (client, message) => {
    const randomEmoji = sadEmojis[Math.floor(Math.random() * sadEmojis.length)];
    client.sendMessage(message.from, { text: randomEmoji });
  }
};
