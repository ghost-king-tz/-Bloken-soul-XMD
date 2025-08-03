const axios = require('axios');
const { igdl } = require('@bochilteam/scraper');

module.exports = {
  name: 'instagram',
  alias: ['ig', 'igdl', 'reels'],
  description: 'Pakua reels, picha au video kutoka Instagram',
  category: 'download',
  use: '<link ya instagram>',
  premium: false,
  async exec({ sock, m, args }) {
    if (!args[0]) {
      return m.reply('📎 Tafadhali weka link ya Instagram.\nMfano: .instagram https://www.instagram.com/reel/xyz/');
    }

    const url = args[0];
    try {
      const res = await igdl(url);
      const result = res.result || res;
      if (!result || result.length === 0) return m.reply('⚠️ Hakuna media iliyopatikana.');

      for (const media of result) {
        if (media.type === 'image') {
          await sock.sendMessage(m.chat, {
            image: { url: media.url },
            caption: '📷 Picha kutoka Instagram'
          }, { quoted: m });
        } else if (media.type === 'video') {
          await sock.sendMessage(m.chat, {
            video: { url: media.url },
            caption: '🎥 Video kutoka Instagram'
          }, { quoted: m });
        }
      }
    } catch (e) {
      console.error(e);
      m.reply('❌ Imeshindikana kupakua. Hakikisha link ya Instagram ni sahihi (reel/video/picha).');
    }
  }
};
