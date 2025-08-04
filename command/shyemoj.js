js
const shyEmojis = ['😊', '☺️', '😳', '🫣', '🤭', '😌', '😽', '🙊', '🙉', '😙', '🫠', '🙃'];

module.exports = {
  name: 'shy',
  description: 'Send a random shy emoji',
  execute: async (client, message) => {
    const randomEmoji = shyEmojis[Math.floor(Math.random() * shyEmojis.length)];
    client.sendMessage(message.from, { text: randomEmoji });
  }
};
```
