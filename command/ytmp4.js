const { youtubedl } = require('@bochilteam/scraper');

module.exports = {
  name: 'ytmp4',
  alias: ['ytvideo', 'ytaudio'],
  description: 'Pakua video ya YouTube kwa kutumia link',
  category: 'download',
  use: '<youtube link>',
  premium: false,
  async exec({ sock, m, args }) {
    if (!args[0]) {
      return m.reply('Tafadhali weka link ya YouTube.\n\nMfano: .ytmp4 https://youtu.be/abc123xyz');
    }

    try {
      const { video, title, thumbnail } = await youtubedl(args[0]);

      await sock.sendMessage(m.chat, {
        image: { url: thumbnail },
        caption: `*🎬 Jina:* ${title}\n\nInapakua video...`
      });

      await sock.sendMessage(m.chat, {
        video: { url: video.url },
        caption: '✅ Hii hapa video yako!'
      }, { quoted: m });

    } catch (error) {
      console.error(error);
      m.reply('😢 Samahani, imeshindikana kupakua video. Hakikisha link ni sahihi.');
    }
  }
};
