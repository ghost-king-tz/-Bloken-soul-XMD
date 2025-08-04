js
const funnyEmojis = [
  '😂', '🤣', '😹', '😆', '😄', '😜', '😝',
  '😛', '🙃', '😸', '🤪', '🤭', '😇',
  '🃏', '🎭', '🎉', '🪅', '🎊', '😋', '😺'
];

module.exports = {
  name: 'funny',
  description: 'Send a random funny emoji',
  execute: async (client, message) => {
    const randomEmoji = funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)];
    client.sendMessage(message.from, { text: randomEmoji });
  }
};
