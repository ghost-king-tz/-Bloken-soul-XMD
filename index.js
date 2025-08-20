// index.js

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys')
const { Boom } = require('@hapi/boom')
const fs = require("fs")
const path = require("path")

// OWNER INFO
const ownerName = "𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝-XMD"
const ownerNumber = "255719632816" // usiweke +

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("session")

    const sock = makeWASocket({
        printQRInTerminal: true,
        auth: state,
        browser: ["Broken Soul-XMD","Chrome","1.0"]
    })

    sock.ev.on("creds.update", saveCreds)

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update
        if(connection === "close") {
            const reason = new Boom(lastDisconnect?.error)?.output.statusCode
            if(reason === DisconnectReason.loggedOut) {
                console.log("❌ Logged out, delete session and scan again.")
            } else {
                startBot()
            }
        } else if(connection === "open") {
            console.log("✅ Bot Connected Successfully!")
            sock.sendMessage(ownerNumber + "@s.whatsapp.net", { text: 
                `Owner ${ownerName} connected successfully.\nPress *menu* to see all commands.` 
            })
        }
    })

    // Handle messages
    sock.ev.on("messages.upsert", async (m) => {
        const msg = m.messages[0]
        if(!msg.message) return
        if(msg.key && msg.key.remoteJid === "status@broadcast") return

        const from = msg.key.remoteJid
        const type = Object.keys(msg.message)[0]
        const text = 
            type === "conversation" ? msg.message.conversation :
            type === "extendedTextMessage" ? msg.message.extendedTextMessage.text : ""

        // Example simple command
        if(text.toLowerCase() === "menu") {
            await sock.sendMessage(from, { text: 
                "📖 Broken Soul-XMD Bot Menu\n\n1. .ping\n2. .about\n3. Premium Features\n\n⚡ More coming soon..."
            })
        }

        if(text.toLowerCase() === ".ping") {
            await sock.sendMessage(from, { text: "🏓 Pong!" })
        }

        if(text.toLowerCase() === ".about") {
            await sock.sendMessage(from, { text: `🤖 Bot made by ${ownerName}` })
        }
    })
}

startBot()
