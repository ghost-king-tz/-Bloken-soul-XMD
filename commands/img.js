const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = {
    name: "img",
    description: "Generate AI image from prompt",
    execute: async (sock, msg, args) => {
        if (!args.length) return sock.sendMessage(msg.key.remoteJid, { text: "Usage: .img <prompt>" });

        const prompt = args.join(" ");
        await sock.sendMessage(msg.key.remoteJid, { text: `🎨 Generating image for: "${prompt}"...` });

        try {
            // Simulated AI image generation (replace this with OpenAI / Gemini API if available)
            // For demo, let's use placeholder image
            const imageUrl = `https://via.placeholder.com/512x512.png?text=${encodeURIComponent(prompt)}`;
            
            const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
            const imageBuffer = Buffer.from(response.data, "binary");

            await sock.sendMessage(msg.key.remoteJid, { image: imageBuffer, caption: `🎨 AI Image for: "${prompt}"` });

        } catch (err) {
            console.log(err);
            await sock.sendMessage(msg.key.remoteJid, { text: "❌ Failed to generate image. Try again later." });
        }
    }
}
