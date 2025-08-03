module.exports = {
  name: 'add',
  category: 'group',
  desc: 'Ongeza mtu kwenye group kwa namba',
  use: '<number>',
  premium: false,
  group: true,
  admin: true,
  botAdmin: true,

  async exec({ sock, m, args }) {
    if (!args[0]) return m.reply('⚠️ Ingiza namba ya mtu (Tumia format ya E.164 mfano: 2557xxxxxxx)');

    let number = args[0];
    if (!number.endsWith('@s.whatsapp.net')) {
      number = number + '@s.whatsapp.net';
    }

    try {
      await sock.groupParticipantsUpdate(m.chat, [number], 'add');
      await m.reply(`✅ Namba ${args[0]} imeongezwa kwenye group.`);
    } catch (e) {
      await m.reply(`❌ Imeshindikana kuongeza namba: ${e.message}`);
    }
  },
};
