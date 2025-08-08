const { default: makeWASocket, useSingleFileAuthState } = require("@adiwajshing/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const P = require("pino");
const dotenv = require("dotenv");
dotenv.config();

const SESSION_FILE = "./session.json";
const COMMANDS_DIR = path.join(__dirname, "commands");

const { state, saveState } = useSingleFileAuthState(SESSION_FILE);

async function startBot() {
    const sock = makeWASocket({
        logger: P({ level: "silent" }),
        printQRInTerminal: true,
        auth: state,
        browser: ["Broken Soul-XMD", "Chrome", "1.0.0"]
    });

    sock.ev.on("creds.update", saveState);

    sock.ev.on("connection.update", (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === "close") {
            const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
            console.log(chalk.red("Connection closed due to:"), lastDisconnect?.error);
            if (shouldReconnect) startBot();
        } else if (connection === "open") {
            console.log(chalk.greenBright("✅ Broken Soul-XMD bot connected successfully."));
            sock.sendMessage(sock.user.id, { text: "Owner 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝-XMD connected successfully. Press menu to see all commands." });
        }
    });

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
        if (type !== "notify") return;
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;

        const from = msg.key.remoteJid;
        const text = msg.message.conversation || msg.message.extendedTextMessage?.text;
        if (!text) return;

        const commandName = text.trim().split(" ")[0].toLowerCase();

        const commandPath = path.join(COMMANDS_DIR, `${commandName.replace(".", "")}.js`);
        if (fs.existsSync(commandPath)) {
            const command = require(commandPath);
            try {
                await command.run(sock, msg, text);
            } catch (err) {
                console.error("❌ Error running command:", err);
                await sock.sendMessage(from, { text: "⚠️ Error executing that command." });
            }
        }
    });
}

startBot();
