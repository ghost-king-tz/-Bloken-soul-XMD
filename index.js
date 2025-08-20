const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@adiwajshing/baileys')
const { Boom } = require('@hapi/boom')
const pino = require('pino')
require('dotenv').config()

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(process.env.SESSION_PATH || './session')

    const sock = makeWASocket({
        logger: pino({ level: 'silent' }),
        auth: state
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
                console.log("❌ Logged out. Delete session and restart.")
            } else {
                console.log("⚠️ Reconnecting...")
                startBot()
            }
        }
    })

    // pairing code method
    if (!sock.authState.creds.registered) {
        const number1 = process.env.OWNER_NUMBER1
        const number2 = process.env.OWNER_NUMBER2
        const phoneNumber = number1 || number2

        console.log("📲 Getting Pairing Code for:", phoneNumber)
        let code = await sock.requestPairingCode(phoneNumber)
        console.log("🔑 Pairing Code:", code)
        console.log("👉 WhatsApp > Linked Devices > Link with phone number")
    }

    return sock
}

startBot()
