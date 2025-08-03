module.exports = {
  name: 'open',
  category: 'group',
  desc: 'Fungua group (members waweze kuandika)',
  premium: false,
  group: true,
  admin: true,
  botAdmin: true,

  async exec({ sock, m }) {
    try {
      await sock.groupSettingUpdate(m.chat, 'not_announcement');
      await m.reply('✅ Group imefunguliwa, members sasa wanaweza kuandika.');
    } catch (e) {
      await m.reply(`❌ Imeshindikana kufungua group: ${e.message}`);
    }
  },
};
