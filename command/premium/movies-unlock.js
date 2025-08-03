
const { default: makeWASocket } = require('@whiskeysockets/baileys')
const { isPremium } = require('../../premium.json') // or your premium check method

module.exports = {
  name: 'movies',
  description: '🎬 Unlock movie streaming & download apps [Premium Only]',
  category: 'premium',
  premium: true,
  async execute(msg, sock, args, user) {
    const jid = msg.key.remoteJid
    const sender = msg.key.participant || msg.key.remoteJid

    // Check if user is premium
    if (!isPremium(sender)) {
      return sock.sendMessage(jid, { text: '🚫 *This feature is for Premium Users only!*' }, { quoted: msg })
    }

    // Send movie app links or guide
    const text = `🎬 *Movie Apps Unlock*\n\nHere are premium movie apps you can use:\n
1. *Cinema HD* - https://cinemahd.app/download/
2. *BeeTV* - https://beetvapk.org/
3. *FilmPlus* - https://filmplus.app/
4. *MovieBox Pro* - https://movieboxpro.app/

⚠️ Use a VPN when using some of these apps.

Enjoy your movies 🍿!`

    await sock.sendMessage(jid, { text }, { quoted: msg })
  }
}
