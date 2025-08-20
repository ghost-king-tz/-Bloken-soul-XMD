const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const pino = require('pino')
require('dotenv').config()

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('./session')

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state,
        printQRInTerminal: false
    })

    sock.ev.on('creds.update', saveCreds)

    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect } = update

        if (connection === 'open') {
            console.log("✅ Bot connected as", sock.user.id)
        }

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode
            if (reason === DisconnectReason.loggedOut) {
         } else {
                console.log("⚠️ Reconnecting...")
                startBot()
            }
        }
    })

    if (!sock.authState.creds.registered) {
        const phoneNumber = '255613420746' // ← weka namba yako hapa
        const code = await sock.requestPairingCode(phoneNumber)
        console.log("🔑 Pairing Code:", code)
        console.log("👉 WhatsApp > Linked Devices > Link with phone number")
    }

    return sock
}

startBot()
