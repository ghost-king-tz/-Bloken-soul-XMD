const { tiktokdl } = require('@bochilteam/scraper');

module.exports = {
  name: 'tiktok',
  alias: ['tt', 'tiktokdl'],
  description: 'Pakua video ya TikTok bila watermark',
  category: 'download',
  use: '<tiktok link>',
  premium: false,
  async exec({ sock, m, args }) {
    if (!args[0]) {
      return m.reply('🙃 Tafadhali weka link ya TikTok.\nMfano: .tiktok https://vm.tiktok.com/xyz123/');
    }

    try {
      const { video, author, desc, thumbnail } = await tiktokdl(args[0]);

      await sock.sendMessage(m.chat, {
        image: { url: thumbnail },
        caption: `👤 *Mmiliki:* ${author.nickname}\n📝 *Maelezo:* ${desc}`
      });

      await sock.sendMessage(m.chat, {
        video: { url: video.no_watermark },
        caption: '✅ Video hii hapa bila watermark!'
      }, { quoted: m });

    } catch (e) {
      console.error(e);
      m.reply('😓 Imeshindikana kupakua. Hakikisha link ni sahihi.');
    }
  }
};
