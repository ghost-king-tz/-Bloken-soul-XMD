module.exports = {
  name: "vv",
  alias: ["viewonce", "unviewonce"],
  desc: "Open view-once media",
  category: "Media",
  usage: "reply to view-once image or video with: vv",
  react: "🔓",
  start: async (Miku, m, { quoted, mime }) => {
    if (!quoted) return m.reply("❗ Reply to a view-once image or video!");
    if (!/image|video/.test(quoted.mtype)) return m.reply("❗ Only works on image or video!");
    if (!quoted.viewOnce) return m.reply("❗ That message is not view-once!");

    let media = await quoted.download();
    await Miku.sendMessage(m.from, { [quoted.mtype]: media }, { quoted: m });
  },
};
