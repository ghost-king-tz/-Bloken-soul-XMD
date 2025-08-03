const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const premiumUsers = JSON.parse(fs.readFileSync(path.join(__dirname, "../premium.json")));
const { isLicensed } = require("../license");

async function downloadVideoCommand(sender, args, reply) {
  const isPremium = isLicensed(sender) || premiumUsers.includes(sender);

  if (!isPremium) {
    return reply("🚫 This feature is only for premium users. Contact owner to upgrade.");
  }

  const url = args[0];
  if (!url) return reply("❌ Please provide a valid video URL.");

  // You can customize this command or use API later
  reply("⏳ Downloading video...");
  
  // Hapa tunajifanya tunapakua, unaweza ongeza API halisi baadae
  setTimeout(() => {
    reply("✅ Video downloaded successfully! (Mock)\n[Link]: https://example.com/video.mp4");
  }, 2000);
}

module.exports = { downloadVideoCommand };
