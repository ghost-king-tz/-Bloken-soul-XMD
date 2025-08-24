module.exports = {
    name: "add",
    description: "Add user to group",
    execute: async (sock, msg, args) => {
        if (!msg.key.remoteJid.endsWith("@g.us")) return sock.sendMessage(msg.key.remoteJid, { text: "Group only!" });
        if (!args[0]) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .add 2547xxxx" });

        try {
            await sock.groupParticipantsUpdate(msg.key.remoteJid, [args[0] + "@s.whatsapp.net"], "add");
            sock.sendMessage(msg.key.remoteJid, { text: `✅ Added ${args[0]} to the group` });
        } catch (e) {
            sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to add user" });
        }
    }
              }
