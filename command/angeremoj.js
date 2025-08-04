js
const angerEmojis = [
  '😠', '😡', '🤬', '👿', '😈', '💢',
  '⚡', '🗯️', '😑', '😐', '🤨',
  '😤', '😖', '😣', '😾',
  '🥴', '😬', '😶', '🤧'
];

module.exports = {
  name: 'anger',
  description: 'Send a random anger emoji',
  execute: async (client, message) => {
    const randomEmoji = angerEmojis[Math.floor(Math.random() * angerEmojis.length)];
    client.sendMessage(message.from, { text: randomEmoji });
  }
};
