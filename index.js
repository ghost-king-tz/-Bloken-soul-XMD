const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  DisconnectReason
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const P = require("pino");
const fs = require("fs");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState('./session');
  const { version } = await fetchLatestBaileysVersion();

  const sock = makeWASocket({
    version,
    logger: P({ level: "silent" }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, P({ level: "silent" }))
    },
    printQRInTerminal: false,
    browser: ["Nezha MD", "Safari", "1.0.0"]
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === "open") {
      console.log("✅ Bot connected as:", sock.user.id);
    }

    if (connection === "close") {
      const reason = new Boom(lastDisconnect?.error)?.output.statusCode;console.log("❌ Connection closed. Reason:", reason);

      if (reason !== DisconnectReason.loggedOut) {
        startBot(); // retry auto
      } else {
        console.log("Session imefutwa. Tafadhali fanya pairing tena.");
      }
    }

    // Pairing code
    if (!sock.authState.creds.registered) {
      const pairingNumber = "255719632816"; // weka namba yako ya WhatsApp bila "+"
      const code = await sock.requestPairingCode(pairingNumber);
      console.log(`📲 Pairing code for pairingNumber:{code}`);
    }
  });
}

startBot();


          
