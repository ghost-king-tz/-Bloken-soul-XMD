module.exports = {
    name: "tagall",
    description: "Mention everyone in group",
    execute: async (sock, msg) => {
        if (!msg.key.remoteJid.endsWith("@g.us")) return sock.sendMessage(msg.key.remoteJid, { text: "Group only!" });

        let metadata = await sock.groupMetadata(msg.key.remoteJid);
        let participants = metadata.participants.map(u => u.id);
        let text = "📢 *Tagging all members:*\n\n";
        text += participants.map((u, i) => `${i + 1}. @${u.split("@")[0]}`).join("\n");

        await sock.sendMessage(msg.key.remoteJid, { text, mentions: participants });
    }
}
