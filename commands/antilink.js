let antilink = {};

module.exports = {
    name: "antilink",
    description: "Enable/Disable Anti-link",
    execute: async (sock, msg, args) => {
        if (!msg.key.remoteJid.endsWith("@g.us")) return sock.sendMessage(msg.key.remoteJid, { text: "Group only!" });

        const option = args[0];
        if (option === "on") {
            antilink[msg.key.remoteJid] = true;
            sock.sendMessage(msg.key.remoteJid, { text: "✅ Anti-link enabled" });
        } else if (option === "off") {
            delete antilink[msg.key.remoteJid];
            sock.sendMessage(msg.key.remoteJid, { text: "❌ Anti-link disabled" });
        } else {
            sock.sendMessage(msg.key.remoteJid, { text: "Usage: .antilink on/off" });
        }
    }
}

// Check messages if link detected
module.exports.checkMessage = async (sock, msg) => {
    const jid = msg.key.remoteJid;
    if (antilink[jid] && msg.message?.conversation?.includes("chat.whatsapp.com")) {
        await sock.sendMessage(jid, { text: `🚫 Link detected! @${msg.key.participant.split("@")[0]} removed.` , mentions:[msg.key.participant]});
        await sock.groupParticipantsUpdate(jid, [msg.key.participant], "remove");
    }
}
