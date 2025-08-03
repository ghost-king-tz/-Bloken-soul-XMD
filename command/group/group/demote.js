module.exports = {
  name: "demote",
  description: "Mnyang'anye user cheo cha admin kwenye group",
  category: "group",
  premium: false,
  async execute(m, { sock, isGroup, isBotAdmin, isAdmin, args }) {
    if (!isGroup) return m.reply("⛔ Hii command inafanya kazi kwenye group tu.");
    if (!isAdmin) return m.reply("⛔ Ni admin tu wanaoweza kutumia hii command.");
    if (!isBotAdmin) return m.reply("⛔ Bot inapaswa kuwa admin ili kuondoa cheo.");

    const mentioned = m.mentionedJid[0] || m.quoted?.sender;
    if (!mentioned) return m.reply("⚠️ Taja mtu au reply message yake ili kumpokonya cheo.");

    try {
      await sock.groupParticipantsUpdate(m.chat, [mentioned], "demote");
      m.reply(`✅ ${mentioned.split("@")[0]} ameondolewa cheo cha admin.`);
    } catch (err) {
      console.error(err);
      m.reply("❌ Imeshindikana kumuondoa cheo.");
    }
  },
};
