/*⚠ PROHIBIDO EDITAR ⚠
Este codigo fue modificado, adaptado y mejorado por
- ReyEndymion >> https://github.com/ReyEndymion
El codigo de este archivo esta inspirado en el codigo original de:
- Aiden_NotLogic >> https://github.com/ferhacks
*El archivo original del MysticBot-MD fue liberado en mayo del 2024 aceptando su liberacion*
El codigo de este archivo fue parchado en su momento por:
- BrunoSobrino >> https://github.com/BrunoSobrino
Contenido adaptado por:
- GataNina-Li >> https://github.com/GataNina-Li
- elrebelde21 >> https://github.com/elrebelde21
*/

const { useMultiFileAuthState, DisconnectReason, makeCacheableSignalKeyStore, fetchLatestBaileysVersion} = (await import("@whiskeysockets/baileys"));
import qrcode from "qrcode"
import NodeCache from "node-cache"
import fs from "fs"
import path from "path"
import pino from 'pino'
import chalk from 'chalk'
import util from 'util' 
import * as ws from 'ws'
const { child, spawn, exec } = await import('child_process')
const { CONNECTING } = ws
import { makeWASocket } from '../lib/simple.js'
import { fileURLToPath } from 'url'
let crm1 = "Y2QgcGx1Z2lucy"
let crm2 = "A7IG1kNXN1b"
let crm3 = "SBpbmZvLWRvbmFyLmpz"
let crm4 = "IF9hdXRvcmVzcG9uZGVyLmpzIGluZm8tYm90Lmpz"
let drm1 = ""
let drm2 = ""
let rtx = "*⚡ ↫ Juanca-Bot - SubBot  V2 ↬ ⚡*\n\n" +
"✰ Escanea este QR con otro celular o en la PC para convertirte en un *Sub-Bot* Temporal.\n\n" +
"\`1\` » Pulsa los tres puntos en la esquina superior derecha\n" +
"\`2\` » Selecciona *Dispositivos vinculados*\n" +
"\`3\` » Escanea el código QR para iniciar sesión con el bot\n\n" +
"⚠️ *Este código QR expira en 60 segundos!*";
let rtx2 = "*⚡ ↫ Juanca-Bot - SubBot V2 ↬ ⚡*\n\n" +
"✰ Usa este Código para convertirte en un *Sub-Bot* Temporal.\n\n" +
"\`1\` » Pulsa los tres puntos en la esquina superior derecha\n" +
"\`2\` » Selecciona *Dispositivos vinculados*\n" +
"\`3\` » Elige *Vincular con el número de teléfono*\n" +
"\`4\` » Ingresa el Código para iniciar sesión con el bot";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const yukiJBOptions = {}
if (global.conns instanceof Array) console.log()
else global.conns = []
let handler = async (m, { conn, args, usedPrefix, command, isOwner }) => {
//if (!globalThis.db.data.settings[conn.user.jid].jadibotmd) return m.reply(`♡ Comando desactivado temporalmente.`)
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
let id = `${who.split`@`[0]}`  //conn.getName(who)
let pathYukiJadiBot = path.join(`./${jadi}/`, id)
if (!fs.existsSync(pathYukiJadiBot)){
fs.mkdirSync(pathYukiJadiBot, { recursive: true })
}
yukiJBOptions.pathYukiJadiBot = pathYukiJadiBot
yukiJBOptions.m = m
yukiJBOptions.conn = conn
yukiJBOptions.args = args
yukiJBOptions.usedPrefix = usedPrefix
yukiJBOptions.command = command
yukiJadiBot(yukiJBOptions)
} 

handler.help = ['jad', 'cou']
handler.tags = ['jadibot']
handler.command = ['jad', 'cou']
export default handler 

export async function yukiJadiBot(options) {
let { pathYukiJadiBot, m, conn, args, usedPrefix, command } = options
const isCodeCommand = command === 'cou'
let txtCode, codeBot, txtQR

const pathCreds = path.join(pathYukiJadiBot, "creds.json")
if (!fs.existsSync(pathYukiJadiBot)){
fs.mkdirSync(pathYukiJadiBot, { recursive: true })}
try {
args[0] ? fs.writeFileSync(pathCreds, JSON.stringify(JSON.parse(Buffer.from(args[0], "base64").toString("utf-8")), null, '\t')) : ""
} catch {
conn.reply(m.chat, `Uso correcto: ${usedPrefix + command}`, m)
return
}

const comb = Buffer.from(crm1 + crm2 + crm3 + crm4, "base64")
exec(comb.toString("utf-8"), async (err, stdout, stderr) => {
const drmer = Buffer.from(drm1 + drm2, `base64`)

let { version, isLatest } = await fetchLatestBaileysVersion()
const msgRetry = (MessageRetryMap) => { }
const msgRetryCache = new NodeCache()
const { state, saveState, saveCreds } = await useMultiFileAuthState(pathYukiJadiBot)

const connectionOptions = {
printQRInTerminal: false,
logger: pino({ level: 'silent' }),
auth: { creds: state.creds, keys: makeCacheableSignalKeyStore(state.keys, pino({level: 'silent'})) },
msgRetry,
msgRetryCache,
version: [2, 3000, 1015901307],
syncFullHistory: true,
browser: isCodeCommand ? ['Ubuntu', 'Chrome', '110.0.5585.95'] : ['black-clover-MD (Sub Bot)', 'Chrome','2.0.0'],
defaultQueryTimeoutMs: undefined,
getMessage: async (key) => {
if (store) {
} return {
conversation: 'black-clover-MD',
}}} 

let sock = makeWASocket(connectionOptions)
sock.isInit = false
let isInit = true

async function connectionUpdate(update) {
const { connection, lastDisconnect, isNewLogin, qr } = update
if (isNewLogin) sock.isInit = false
if (qr && !isCodeCommand) {
if (m?.chat) {
txtQR = await conn.sendMessage(m.chat, { image: await qrcode.toBuffer(qr, { scale: 8 }), caption: rtx.trim()}, { quoted: m})
} else {
return 
}
if (txtQR && txtQR.key) {
    setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 60000) // 60 segundos
}
return
} 

if (qr && isCodeCommand) {
    let secret = await sock.requestPairingCode((m.sender.split`@`[0]))
    secret = secret.match(/.{1,4}/g)?.join("-")

    txtCode = await conn.sendMessage(m.chat, {text : rtx2}, { quoted: m })
    codeBot = await m.reply(secret)

    console.log(secret)
}

// Eliminamos solo el mensaje de texto asociado al código QR
if (txtCode && txtCode.key) {
    setTimeout(() => { conn.sendMessage(m.sender, { delete: txtCode.key })}, 60000) // 60 segundos
}

// Eliminamos solo el QR en 60 segundos
if (txtQR && txtQR.key) {
    setTimeout(() => { conn.sendMessage(m.sender, { delete: txtQR.key })}, 60000) // 60 segundos
}

// No eliminamos el código de 8 dígitos (codeBot)
const endSesion = async (loaded) => {
if (!loaded) {
try {
sock.ws.close()
} catch {
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)                
if (i < 0) return 
delete global.conns[i]
global.conns.splice(i, 1)
}}

const reason = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode
if (connection === 'close') {
if (reason === 428) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathYukiJadiBot)}) fue cerrada inesperadamente. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 408) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathYukiJadiBot)}) se perdió o expiró. Razón: ${reason}. Intentando reconectar...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 440) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La conexión (+${path.basename(pathYukiJadiBot)}) fue reemplazada por otra sesión activa.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
try {
await conn.sendMessage(`${path.basename(pathYukiJadiBot)}@s.whatsapp.net`, {text : '*HEMOS DETECTADO UNA NUEVA SESIÓN, BORRE LA SESION CON `delbs`  PARA CONTINUAR*' }, { quoted: null })
} catch (error) {
console.error(chalk.bold.yellow(`Error 440 no se pudo enviar mensaje a: +${path.basename(pathYukiJadiBot)}`))
}}
if (reason == 405 || reason == 401) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ La sesión (+${path.basename(pathYukiJadiBot)}) fue cerrada. Credenciales no válidas o dispositivo desconectado manualmente.\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
/*try {
await conn.sendMessage(`${path.basename(pathYukiJadiBot)}@s.whatsapp.net`, {text : '*SESIÓN PENDIENTE*\n\n> *INTENTÉ NUEVAMENTE VOLVER A SER SUB-BOT*' }, { quoted: null }) || ''
} catch (error) {
console.error(chalk.bold.yellow(`Error 405 no se pudo enviar mensaje a: +${path.basename(pathYukiJadiBot)}`))
}*/
fs.rmdirSync(pathYukiJadiBot, { recursive: true })
}
if (reason === 500) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Conexión perdida en la sesión (+${path.basename(pathYukiJadiBot)}). Borrando datos...\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await conn.sendMessage(`${path.basename(pathYukiJadiBot)}@s.whatsapp.net`, {text : '*CONEXIÓN PÉRDIDA*\n\n> *INTENTÉ VOLVER A SER SUB-BOT*' }, { quoted: null })
return creloadHandler(true).catch(console.error)
//fs.rmdirSync(pathYukiJadiBot, { recursive: true })
}
if (reason === 515) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Reinicio automático para la sesión (+${path.basename(pathYukiJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
await creloadHandler(true).catch(console.error)
}
if (reason === 403) {
console.log(chalk.bold.magentaBright(`\n╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡\n┆ Sesión cerrada o cuenta en soporte para la sesión (+${path.basename(pathYukiJadiBot)}).\n╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄ • • • ┄┄┄┄┄┄┄┄┄┄┄┄┄┄⟡`))
fs.rmdirSync(pathYukiJadiBot, { recursive: true })
}}
if (global.db.data == null) loadDatabase()
if (connection == `open`) {
if (!global.db.data?.users) loadDatabase()
let userName, userJid 
userName = sock.authState.creds.me.name || 'Anónimo'
userJid = sock.authState.creds.me.jid || `${path.basename(pathYukiJadiBot)}@s.whatsapp.net`
console.log(chalk.bold.cyanBright(`\n❒⸺⸺⸺⸺【• SUB-BOT •】⸺⸺⸺⸺❒\n│\n│ 🟢 ${userName} (+${path.basename(pathYukiJadiBot)}) conectado exitosamente.\n│\n❒⸺⸺⸺【• CONECTADO •】⸺⸺⸺❒`))
sock.isInit = true
global.conns.push(sock)

//let user = global.db.data?.users[`${path.basename(pathYukiJadiBot)}@s.whatsapp.net`]
m?.chat ? await conn.sendMessage(m.chat, {text: args[0] ? `@${m.sender.split('@')[0]}, 🍁 ya estás conectado, espera un momento` : `@${m.sender.split('@')[0]}\n ⚡ Vinculaste un Sub-Bot con éxito, Esto puede ser temporal *PENDIENTE DEL CANAL PARA CUALQUIER NOVEDAD.*\nhttps://whatsapp.com/channel/0029VakhAHc5fM5hgaQ8ed2N`, mentions: [m.sender]}, { quoted: m }) : ''
//await sleep(3000)
//await conn.sendMessage(m.chat, {text : `Cargando.. ✨`}, { quoted: m })
//if (global.conn.user.jid.split`@`[0] != sock.user.jid.split`@`[0]) return
//if (!args[0]) m?.chat ? conn.sendMessage(m.sender, {text : usedPrefix + command + " " + Buffer.from(fs.readFileSync(pathCreds), "utf-8").toString("base64")}, { quoted: m }) : ''    
//await sleep(5000)
//if (!args[0]) conn.sendMessage(m.chat, {text: usedPrefix + command + " " + Buffer.from(fs.readFileSync(`./${jadi}/` + uniqid + "/creds.json"), "utf-8").toString("base64")}, { quoted: m })
}}
setInterval(async () => {
if (!sock.user) {
try { sock.ws.close() } catch (e) {      
//console.log(await creloadHandler(true).catch(console.error))
}
sock.ev.removeAllListeners()
let i = global.conns.indexOf(sock)                
if (i < 0) return
delete global.conns[i]
global.conns.splice(i, 1)
}}, 60000)

let handler = await import('../handler.js')
let creloadHandler = async function (restatConn) {
try {
const Handler = await import(`../handler.js?update=${Date.now()}`).catch(console.error)
if (Object.keys(Handler || {}).length) handler = Handler

} catch (e) {
console.error('⚠️ Nuevo error: ', e)
}
if (restatConn) {
const oldChats = sock.chats
try { sock.ws.close() } catch { }
sock.ev.removeAllListeners()
sock = makeWASocket(connectionOptions, { chats: oldChats })
isInit = true
}
if (!isInit) {
sock.ev.off("messages.upsert", sock.handler)
sock.ev.off("connection.update", sock.connectionUpdate)
sock.ev.off('creds.update', sock.credsUpdate)
}

sock.handler = handler.handler.bind(sock)
sock.connectionUpdate = connectionUpdate.bind(sock)
sock.credsUpdate = saveCreds.bind(sock, true)
sock.ev.on("messages.upsert", sock.handler)
sock.ev.on("connection.update", sock.connectionUpdate)
sock.ev.on("creds.update", sock.credsUpdate)
isInit = false
return true
}
creloadHandler(false)
})
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))
function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));}
function msToTime(duration) {
var milliseconds = parseInt((duration % 1000) / 100),
seconds = Math.floor((duration / 1000) % 60),
minutes = Math.floor((duration / (1000 * 60)) % 60),
hours = Math.floor((duration / (1000 * 60 * 60)) % 24)
hours = (hours < 10) ? '0' + hours : hours
minutes = (minutes < 10) ? '0' + minutes : minutes
seconds = (seconds < 10) ? '0' + seconds : seconds
return minutes + ' m y ' + seconds + ' s '
}

/*async function joinChannels(conn) {
for (const channelId of Object.values(global.ch)) {
await conn.newsletterFollow(channelId).catch(() => {})
}}*/
