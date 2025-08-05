const fs = require('fs')

// Hifadhi settings kwa kila group
const dbFile = './antilinkkgc.json'
let antilinkData = fs.existsSync(dbFile) ? JSON.parse(fs.readFileSync(dbFile)) : {}

function saveSettings() {
    fs.writeFileSync(dbFile, JSON.stringify(antilinkData, null, 2))
}

module.exports = {
    name: 'antilinkkgc',
    description: 'Enable or disable anti-link protection in group.',
    async execute(sock, msg, args) {
        const from = msg.key.remoteJid
        const isGroup = from.endsWith('@g.us')

        if (!isGroup) return sock.sendMessage(from, { text: '❌ This command only works in groups.' })

        const sender = msg.key.participant || msg.key.remoteJid
        const groupMeta = await sock.groupMetadata(from)
        const isAdmin = groupMeta.participants.find(p => p.id === sender)?.admin !== undefined

        if (!isAdmin) return sock.sendMessage(from, { text: '🛑 You must be a group admin to use this command.' })

        const choice = args[0]?.toLowerCase()

        if (choice === 'on') {
            antilinkData[from] = true
            saveSettings()
            await sock.sendMessage(from, { text: '✅ Anti-link is now *enabled*. Anyone sending links will be removed automatically.' })
        } else if (choice === 'off') {
            delete antilinkData[from]
            saveSettings()
            await sock.sendMessage(from, { text: '🚫 Anti-link is now *disabled* in this group.' })
        } else {
            await sock.sendMessage(from, { text: 'Usage: *antilinkkgc on* or *antilinkkgc off*\n\nThis feature will auto-remove anyone who sends links.' })
        }
    },
    isGroup: true
      }
