let handler = async (m, { conn, usedPrefix, command}) => {

let fkontak = { "key": { "participants":"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

let yaemori = ` Hola 👋

para tener a Juanca-Bot en tu grupo se debe tener en cuenta estos requerimientos y reglas:

 │> El grupo debe tener como minimo 20 participantes
 │> Si eliminan el bot *NO* se volvera a agregar
 │> Si hay demasiado spam o cosas indevidas el Bot saldra automáticamente
 │> Si no se usa el Bot también se saldrá y no se volverá agregar
 │> Se agrega 1 grupo por persona y 1 bot por grupo
 │> *NO* llamadas al Bot
 
 │> si tienen alguna duda o problemas con el bot oficial contacte al propietario de Juanca-Bot
 
 > si cumple y acepta las reglas y los requerimientos envie su link al wa.me/573163963499
 
 ∆ *_Gracias por preferir a Juanca-Bot_* ∆
 
 
${global.md}`.trim()
await conn.reply(m.chat, yaemori, m, fake)

}
handler.help = ['botreglas']
handler.tags = ['main']
handler.command = ['botreglas', 'op', 'reglasdelbot', 'reglasbot', 'reglas']
handler.private = true 
 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')}
