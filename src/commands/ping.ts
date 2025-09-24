import { ICommand } from '@constants'
import { calculatePing } from '../utils/helper.utils'

export default {
    category: 'general',
    description: `To find out the response from the bot`,
    callback: async ({ msg, client }) => {
        const ping = calculatePing(msg.messageTimestamp, Date.now())

        // Reply ping time
        await msg.reply(`*_${ping} second(s)_*`)

        // Send image
        await client.sendMessage(msg.from, {
            image: { url: 'https://files.catbox.moe/la2zx7.jpg' },
            caption: `Ping result: ${ping} second(s)`
        })

        // Send audio
        await client.sendMessage(msg.from, {
            audio: { url: 'https://files.catbox.moe/myx011.mp3' },
            mimetype: 'audio/mp4'
        })
    },
} as ICommand
