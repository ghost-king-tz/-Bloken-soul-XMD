
const fs = require("fs");
const path = require("path");
const { isLicensed } = require("../license");
const premiumUsers = JSON.parse(fs.readFileSync(path.join(__dirname, "../premium.json")));

const menu = (sender) => {
  const isPremium = isLicensed(sender) || premiumUsers.includes(sender);

  let response = `
╭───❖ 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝-XMD ❖───╮
│ Owner: +255719632816
│ Premium: ${isPremium ? "✅ Yes" : "❌ No"}
│ Commands Menu 🔽
├───────────────
│ .menu – Show this menu
│ .sticker – Convert image to sticker
│ .download <link> – Download video
│ .gpt <text> – Ask AI
│ .laugh – 😂 Emoji Reaction
│ .sad – 😢 Emoji Reaction
${isPremium ? `
│ .ytmp4 <url> – YouTube Video DL
│ .fb <url> – Facebook Video DL
│ .anti-link – Group Link Protection
│ .group manage – Group Tools
` : `
│ 🔐 Premium features locked
│ Buy to unlock: +255719632816
`}
╰──────────────────╯
  `;

  return response;
};

module.exports = { menu };
