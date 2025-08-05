const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys')
const { Boom } = require('@hapi/boom')
const pino = require('pino')
const fs = require('fs')
require('dotenv').config()

// Load session path from .env file
const SESSION_PATH = process.env.SESSION_PATH || './session/session.json'
const { state, saveState } = useSingleFileAuthState(SESSION_PATH)

async function startBot() {
    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        browser: ['Samsung S23', 'Safari', '10.0'],
        syncFullHistory: false, // hii huongeza usalama
    })

    sock.ev.on('creds.update', saveState)

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason === DisconnectReason.loggedOut) {
                console.log('❌ Logged out... Scan QR Again')
            } else {
                console.log('🔁 Reconnecting...')
                startBot()
            }
        } else if (connection === 'open') {
            console.log('✅ Connected as', sock.user.id)
        }
    })

    sock.ev.on('messages.upsert', async ({ messages, type }) => {
        if (type !== 'notify') return
        const msg = messages[0]
        if (!msg.message || msg.key.fromMe) return

        const from = msg.key.remoteJid
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text

        if (text === '.ping') {
            await sock.sendMessage(from, { text: '🟢 Bot is working!' })
        }

        // Add more commands safely here...
    })
}

startBot()
