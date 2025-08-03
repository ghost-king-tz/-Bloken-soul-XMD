module.exports = {
  name: "antilink",
  description: "Zuia watu kutuma links za magroup",
  category: "group",
  admin: true,
  group: true,
  execute: async ({ sock, m, args }) => {
    const action = args[0];
    if (action === "on") {
      global.antilink = true;
      m.reply("✅ Antilink imewashwa");
    } else if (action === "off") {
      global.antilink = false;
      m.reply("❌ Antilink imezimwa");
    } else {
      m.reply("⚠️ Tumia: .antilink on/off");
    }
  },
};
