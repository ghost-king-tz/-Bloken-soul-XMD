// commands/toviewonce.js
module.exports = {
    name: "toviewonce",
    description: "Saves view once message to media",
    execute: async (client, message, args) => {
        try {
            const quoted = message.quoted;
            if (!quoted) return client.sendMessage(message.from, "Please reply to a view once message.");
            if (!quoted.message) return client.sendMessage(message.from, "No media found.");
            const type = Object.keys(quoted.message)[0];
            const media = await client.downloadMediaMessage(quoted);
            await client.sendMessage(message.from, { [type]: media });
        } catch (err) {
            client.sendMessage(message.from, `Error: ${err.message}`);
        }
    }
};
