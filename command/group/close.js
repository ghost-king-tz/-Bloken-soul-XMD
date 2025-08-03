module.exports = {
  name: 'close',
  category: 'group',
  desc: 'Funga group (members wasiwe na uwezo wa kuandika)',
  premium: false,
  group: true,
  admin: true,
  botAdmin: true,

  async exec({ sock, m }) {
    try {
      await sock.groupSettingUpdate(m.chat, 'announcement');
      await m.reply('✅ Group imefungwa, members hawawezi kuandika.');
    } catch (e) {
      await m.reply(`❌ Imeshindikana kufunga group: ${e.message}`);
    }
  },
};
