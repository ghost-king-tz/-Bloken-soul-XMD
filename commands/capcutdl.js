module.exports = {
    name: "capcutdl",
    description: "Download Capcut template",
    execute: async (sock, msg, args) => {
        if (!args[0]) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .capcutdl <link>" });

        const link = args[0];
        await sock.sendMessage(msg.key.remoteJid, { text: `🎥 Downloading Capcut template...\n${link}` });
        // unaweza weka API ya capcut hapa
    }
}
