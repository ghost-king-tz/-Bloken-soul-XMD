const { Sticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
  name: "sticker",
  alias: ["s", "stiker"],
  desc: "Tengeneza sticker kutoka picha au video",
  category: "tools",
  usage: "reply to image/video with .sticker",
  react: "🌟",

  start: async (Miku, m) => {
    const mime = (m.quoted || m).mimetype || '';
    if (!mime.includes('image') && !mime.includes('video')) {
      return m.reply("📸 Tafadhali reply kwenye picha au video fupi ili kuunda sticker.");
    }

    let media = await m.download();
    let sticker = new Sticker(media, {
      pack: "Broken Soul",
      author: "XMD",
      type: StickerTypes.FULL,
      quality: 80,
    });

    const buffer = await sticker.toBuffer();
    Miku.sendMessage(m.from, { sticker: buffer }, { quoted: m });
  }
};
