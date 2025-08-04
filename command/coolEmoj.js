js
const coolEmojis = [
  '😎', '🆒', '🧊', '🧥', '😌', '✌️', '🤙',
  '💯', '🔥', '🧃', '🕶️', '💎', '🛹', '🏍️',
  '🛸', '🎧', '🎵', '🎶', '🖤', '🌪️'
];

module.exports = {
  name: 'cool',
  description: 'Send a random cool emoji',
  execute: async (client, message) => {
    const randomEmoji = coolEmojis[Math.floor(Math.random() * coolEmojis.length)];
    client.sendMessage(message.from, { text: randomEmoji });
  }
};
