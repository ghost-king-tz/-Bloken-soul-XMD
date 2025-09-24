import makeWASocket, {
    ConnectionState,
    DisconnectReason,
    fetchLatestBaileysVersion,
    MessageUpsertType,
    useMultiFileAuthState,
    WAMessage,
    WASocket,
    downloadContentFromMessage,
    proto,
} from '@adiwajshing/baileys'
import { CommandHandler } from '@handlers/command.handler'
import qrcode from 'qrcode'
import P from 'pino'
import { Boom } from '@hapi/boom'
import chalk from 'chalk'
import fetch from 'node-fetch'
import toMs from 'ms'
import fs, { createReadStream, unlinkSync } from 'fs'
import axios from 'axios'
import { sizeFormatter } from 'human-readable'
import { join } from 'path'
import BodyForm from 'form-data'
import Bluebird from 'bluebird'
import { randomBytes } from 'crypto'
import { GlobSync } from 'glob'
import moment from 'moment'

/* =============================
   DOWNLOAD MEDIA
============================= */
export const downloadMedia = async (msg: proto.IMessage): Promise<Buffer | null> => {
    try {
        const type = Object.keys(msg)[0]
        const mimeMap = {
            imageMessage: 'image',
            videoMessage: 'video',
            stickerMessage: 'sticker',
            documentMessage: 'document',
            audioMessage: 'audio',
        }
        const stream = await downloadContentFromMessage(msg[type], mimeMap[type])
        let buffer = Buffer.from([])
        for await (const chunk of stream) {
            buffer = Buffer.concat([buffer, chunk])
        }
        return buffer
    } catch {
        return null
    }
}

/* =============================
   UPLOADER API
============================= */
export const uploaderAPI = (fileData, type) =>
    new Bluebird(async (resolve, reject) => {
        const postFile = async (fileData, type) => {
            const { fileTypeFromBuffer } = await (eval('import("file-type")') as Promise<typeof import('file-type')>)
            const { ext, mime } = await fileTypeFromBuffer(fileData)
            const filePath = join('src', 'tmp', mime.split('/')[0] + getRandom(`.${ext}`))
            const form = new BodyForm()
            await fs.promises.writeFile(filePath, fileData)

            if (type === 'telegraph') {
                form.append('file', createReadStream(filePath))
                const { data } = await axios.post('https://telegra.ph/upload', form, {
                    responseType: 'json',
                    headers: { ...form.getHeaders() },
                })
                if (data.error) reject(data.error)
                return {
                    host: 'telegraph',
                    data: {
                        name: filePath.replace('src/tmp/', ''),
                        url: 'https://telegra.ph' + data[0].src,
                        size: formatSize(fileData.length),
                    },
                }
            } else if (type === 'uguu') {
                form.append('files[]', createReadStream(filePath))
                const { data } = await axios.post('https://uguu.se/upload.php', form, {
                    responseType: 'json',
                    headers: { ...form.getHeaders() },
                })
                return {
                    host: 'uguu',
                    data: {
                        url: data.files[0].url,
                        name: data.files[0].name,
                        size: formatSize(parseInt(data.files[0].size)),
                    },
                }
            } else if (type === 'anonfiles') {
                form.append('file', createReadStream(filePath))
                const { data } = await axios.post('https://api.anonfiles.com/upload', form, {
                    responseType: 'json',
                    headers: { ...form.getHeaders() },
                })
                if (!data.status) reject(data.error.message)
                return {
                    host: 'anonfiles',
                    data: {
                        url: data.data.file.url.short,
                        name: data.data.file.metadata.name,
                        size: data.data.file.metadata.size.readable,
                    },
                }
            }
        }
        try {
            const result = await postFile(fileData, type)
            if (result?.data?.name) {
                fs.unlinkSync(join('src', 'tmp', result.data.name))
            }
            resolve(result)
        } catch (e) {
            reject(e)
        }
    })

/* =============================
   MEME TEXT
============================= */
export const memeText = (imageData, top, bottom) =>
    new Bluebird(async (resolve, reject) => {
        try {
            if (!imageData) reject('No imageData')
            const imageUrl = (await uploaderAPI(imageData, 'uguu')).data.url
            let topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
            let bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')

            let result = `https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`
            let binResult = await getBuffer(result)
            resolve(binResult)
        } catch (e) {
            reject(e)
        }
    })

/* =============================
   HELPERS
============================= */
export const getBuffer = async (url: string) => {
    const res = await fetch(url, { headers: { 'User-Agent': 'okhttp/4.5.0' }, method: 'GET' })
    if (!res.ok) throw 'Error while fetching data'
    const buff = await res.buffer()
    return buff
}

export const getJson = async (url: string) => {
    const res = await fetch(url, { headers: { 'User-Agent': 'okhttp/4.5.0' }, method: 'GET' })
    if (!res.ok) throw 'Error while fetching data'
    return res.json()
}

export const getRandom = (ext) => {
    return randomBytes(7).toString('hex').toUpperCase() + ext
}

export const post = async (url: string, formdata: {}) => {
    return fetch(url, {
        method: 'POST',
        headers: {
            accept: '*/*',
            'accept-language': 'en-US,en;q=0.9',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: Object.keys(formdata)
            .map((key) => `${key}=${encodeURIComponent(formdata[key])}`)
            .join('&'),
    }).then((res) => res.json())
}

export const sleep = async (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const formatSize = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

export const calculatePing = function (timestamp, now) {
    return moment.duration(now - timestamp * 1000).asSeconds()
}

export const ttparse = (text: string) => {
    const rex = /(?:https:?\/{2})?(?:w{3}|vm|vt|t)?\.?tiktok.com\/([^\s&]+)/gi
    const url = text.match(rex)
    return { url: url == null ? '' : url[0] }
}

export const ytparse = (text: string) => {
    const rex = /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌[\w\?‌=]*)?/gi
    const url = text.match(rex)
    return { url: url == null ? '' : url[0] }
}

export const waparse = (text: string) => {
    const rex = /(https?:\/\/)?chat\.whatsapp\.com\/(?:invite\/)?([a-zA-Z0-9_-]{22})/g
    const url = text.match(rex)
    return { url: url == null ? '' : url[0] }
}

export const toTime = (time: number) => {
    let ms = time - Date.now()
    return moment.duration(ms).humanize() // example: "in 2 minutes"
}

export function makeid(length) {
    var result: string = ''
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var charactersLength = characters.length
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

export const postJson = async (url, formdata) => {
    try {
        const res = await axios.post(url, formdata, {
            headers: {
                'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
                'User-Agent': 'Mozilla/5.0',
            },
        })
        return res.data
    } catch (error) {
        throw error
    }
}

export const timeFormat = (seconds) => {
    seconds = Number(seconds)
    var d = Math.floor(seconds / (3600 * 24))
    var h = Math.floor((seconds % (3600 * 24)) / 3600)
    var m = Math.floor((seconds % 3600) / 60)
    var s = Math.floor(seconds % 60)
    var dDisplay = d > 0 ? d + ' Days, ' : ''
    var hDisplay = h > 0 ? h + ' Hours, ' : ''
    var mDisplay = m > 0 ? m + ' Minutes, ' : ''
    var sDisplay = s > 0 ? s + ' Secs' : ''
    return dDisplay + hDisplay + mDisplay + sDisplay
}

export const clearSession = () => {
    new GlobSync('session/*-session.json').found.forEach((v) => {
        try {
            unlinkSync(v)
        } catch {}
    })
}

/* =============================
   BOT SESSION HANDLER
============================= */
export const menjadiBot = async (sock: WASocket, jid: string): Promise<WASocket> => {
    const filename = `./session/${jid.split('@')[0]}-session.json`
    const { state, saveCreds } = await useMultiFileAuthState(filename)
    const commandHander = new CommandHandler()
    const { version } = await fetchLatestBaileysVersion()

    const client = makeWASocket({
        logger: P({ level: 'silent' }),
        printQRInTerminal: false,
        browser: ['Allen', 'Safari', '1.0'],
        auth: state,
        version,
    })

    client.ev.on('creds.update', saveCreds)
    client.ev.on('messages.upsert', (m: { messages: WAMessage[]; type: MessageUpsertType }) => {
        commandHander.messageHandler(m, client)
    })

    client.ev.on('connection.update', async (update: ConnectionState) => {
        const { connection, lastDisconnect, qr } = update
        if (qr) {
            return sock.sendMessage(jid, {
                image: await qrcode.toBuffer(qr, { scale: 8 }),
                caption: 'Scan this QR code to link as a temporary bot:\n\n1. Open WhatsApp > Menu > Linked Devices\n2. Tap "Link a Device"\n3. Scan this QR',
            })
        }
        if (connection === 'open') {
            client.sendMessage(jid, { text: '✅ Client connected' })
        }
        if (connection === 'close') {
            if ((lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut) {
                menjadiBot(sock, jid)
            } else {
                try {
                    unlinkSync(filename)
                } catch {}
            }
        }
        console.log(chalk.whiteBright('├'), chalk.keyword('aqua')('[  STATS  ]'), `Connection : ${update?.connection}`)
    })

    return client
    }
