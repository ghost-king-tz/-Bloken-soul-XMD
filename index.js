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

const commands = new Map();

// Load commands from /commands folder
fs.readdirSync("./commands").forEach(file => {
    if (file.endsWith(".js")) {
        const command = require(`./commands/${file}`);
        commands.set(command.name, command);
    }
});

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState(settings.sessionPath);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
        version,
        logger: P({ level: "silent" }),
        printQRInTerminal: false,
        auth: {
            creds: state.creds,
            keys: makeCacheableSignalKeyStore(state.keys, P({ level: "silent" })),
        },
        browser: [settings.botName, "Chrome", "1.0.0"],
    });

    sock.ev.on("creds.update", saveCreds);try {
                await command.execute(sock, msg, args, settings);
            } catch (err) {
                console.error(err);
                await sock.sendMessage(from, { text: "⚠️ Kulikuwa na error kwenye command hii." });
            }
        }
    });
}

startBot();
