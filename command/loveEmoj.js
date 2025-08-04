js
const loveEmojis = [
  '💘', '💝', '💖', '🩷', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🩶', '🤍',
  '💋', '💟', '💌', '😻', '😍', '🥰', '😘',
  '👩‍❤️‍💋‍👨', '👨‍❤️‍👨', '👩‍❤️‍👨', '💑', '💏',
  '💕', '💗', '💞', '💓',
  '🏩', '🫰', '🫶', '🤟', '❤️‍🔥', '♥️', '❤️'
];

module.exports = {
  name: 'love',
  description: 'Send a random love emoji',
  execute: async (client, message) => {
    const randomEmoji = loveEmojis[Math.floor(Math.random() * loveEmojis.length)];
    client.sendMessage(message.from, { text: randomEmoji });
  }
};
