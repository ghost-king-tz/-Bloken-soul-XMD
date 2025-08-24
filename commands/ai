module.exports = {
    name: "ai",
    description: "Smart AI Chat",
    execute: async (sock, msg, args) => {
        if (!args.length) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .ai <question>" });

        const prompt = args.join(" ");
        // Demo response
        const reply = `🤖 AI Response: You asked *"${prompt}"*.\nThis is a simulated AI reply.`;
        await sock.sendMessage(msg.key.remoteJid, { text: reply });
    }
}
