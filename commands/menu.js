module.exports = {
    name: "menu",
    description: "Show bot features with video header",
    execute: async (sock, msg) => {
        const jid = msg.key.remoteJid;

        const videoLink = "https://i.imgur.com/IYwuzAP.mp4";

        const text = `
╔══✪〘 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝 - XMD 〙✪══

👑 Owner: 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝
📞 Number: +255719632816

📌 *Group Management*
• .add <number>
• .kick @user
• .tagall
• .antilink on/off

💎 *Premium*
• .unlockmovie <name>
• .capcutdl <link>

🤖 *AI & Smart Tools*
• .ai <prompt>
• .chatbot <text>
• .img <prompt>
• .translate <text>
• .tinyurl <link>
• .ssweb <url>
• .sswebpc <url>
• .sswebtab <url>

🎵 *Download Menu*
• .song <name>       - YouTube audio
• .play <name>       - YouTube video
• .fb <link>         - Facebook video
• .ig <link>         - Instagram Reels
• .tiktok <link>     - TikTok video

🔧 *Other Tools*
• .sticker
• .toimage
• .fliptext
• .qrcode

╚══✪〘 Powered by 𝔅𝔯𝔬𝔨𝔢𝔫 𝕊𝕠𝕦𝕝-XMD 〙✪══
        `;

        // Send video as menu header
        await sock.sendMessage(jid, {
            video: { url: videoLink },
            caption: text
        });
    }
          }
