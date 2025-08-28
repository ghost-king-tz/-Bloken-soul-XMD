const {
    default: makeWASocket,
    useMultiFileAuthState,
    DisconnectReason,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");

const P = require("pino");
const fs = require("fs");
const { Boom } = require("@hapi/boom");
const settings = require("./settings.js");

// Load all commands from the /commands folder
const commands = new Map();
fs.readdirSync("./commands").forEach(file => {
    if (file.endsWith(".js")) {
        const command = require(`./commands/${file}`);
        commands.set(command.name, command);
    }
});

async function startBot() {
    // Authenticate and get state
    const { state, saveCreds } = await useMultiFileAuthState(settings.sessionPath);
    // Fetch the latest Baileys version
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, P({ level: "silent" })),
        },
        browser: [settings.botName, "Chrome", "1.0.0"],
    });

    // Save credentials automatically
    sock.ev.on("creds.update", saveCreds);

    // Handle connection status updates
    sock.ev.on("connection.update", async (update) => {
        const { connection, lastDisconnect } = update;

        if (connection === "open") {
            if (sock.user) {
                console.log(`✅ ${settings.botName} is connected as: ${sock.user.id}`);
            } else {
                console.log(`✅ ${settings.botName} is connected.`);
            }
        }

        if (connection === "close") {
            // Reconnect if the connection is closed for any reason other than a deliberate logout
            let reason;
            try {
                reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            } catch {
                reason = lastDisconnect?.error?.statusCode || "unknown";
            }
            console.log("❌ Connection closed:", reason);
            if (reason !== DisconnectReason.loggedOut) {
                setTimeout(startBot, 2000); // avoid stack overflow, add delay
            } else {
                console.log("Logged out. Please re-run the bot to get a new pairing code.");
            }
        }
    });

    // Listen for new messages
    sock.ev.on("messages.upsert", async ({ messages }) => {
        const msg = messages[0];
        // Ignore messages from the bot itself or without a body
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        let body = "";
        if (msg.message.conversation) {
            body = msg.message.conversation;
        } else if (msg.message.extendedTextMessage && msg.message.extendedTextMessage.text) {
            body = msg.message.extendedTextMessage.text;
        } else if (msg.message.imageMessage && msg.message.imageMessage.caption) {
            body = msg.message.imageMessage.caption;
        }

        // Check if the message starts with the defined prefix
        if (!body.startsWith(settings.prefix)) return;

        const args = body.slice(settings.prefix.length).trim().split(/ +/);
        const commandName = args.shift()?.toLowerCase();

        const command = commands.get(commandName);
        if (command) {
            try {
                await command.execute(sock, msg, args, settings);
            } catch (err) {
                console.error("Error executing command:", err);
                await sock.sendMessage(from, { text: "⚠️ Kulikuwa na error kwenye command hii." });
            }
        }
    });

    // Request pairing code if not registered
    if (!state.creds.registered) { // use state.creds instead of sock.authState
        try {
            const code = await sock.requestPairingCode(settings.ownerNumber);
            console.log(`👉 Pairing Code for number ${settings.ownerNumber}: ${code}`);
        } catch (err) {
            console.error("❌ Failed to request pairing code:", err);
        }
    }
}

// Start the bot
startBot();
