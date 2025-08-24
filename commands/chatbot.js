module.exports = {
    name: "chatbot",
    description: "Chat with smart AI",
    execute: async (sock, msg, args) => {
        if (!args.length) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .chatbot hello" });

        const text = args.join(" ");
        // demo response (unaweza link OpenAI / Gemini API hapa)
        const reply = `🤖 SmartBot: You said *"${text}"* — That's interesting!`;

        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
}
