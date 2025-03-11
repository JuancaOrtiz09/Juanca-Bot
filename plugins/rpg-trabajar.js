let cooldowns = {}

let handler = async (m, { conn, isPrems }) => {
let user = global.db.data.users[m.sender]
let tiempo = 5 * 60
if (cooldowns[m.sender] && Date.now() - cooldowns[m.sender] < tiempo * 1000) {
const tiempo2 = segundosAHMS(Math.ceil((cooldowns[m.sender] + tiempo * 1000 - Date.now()) / 1000))
conn.reply(m.chat, ` Espera ⏱️ *${tiempo2}* para volver a Trabajar.`, m, )
return
}
let rsl = Math.floor(Math.random() * 50000000000)
cooldowns[m.sender] = Date.now()
await conn.reply(m.chat, `⚡ ${pickRandom(trabajo)} *${toNum(rsl)}* ( *${rsl}* ) XP 🍭.`, m, )
user.exp += rsl
}

handler.help = ['trabajar']
handler.tags = ['rpg']
handler.command = ['w','work','chambear','chamba', 'trabajar']
handler.group = true;

export default handler

function toNum(number) {
if (number >= 1000 && number < 1000000) {
return (number / 1000).toFixed(1) + 'k'
} else if (number >= 1000000) {
return (number / 1000000).toFixed(1) + 'M'
} else if (number <= -1000 && number > -1000000) {
return (number / 1000).toFixed(1) + 'k'
} else if (number <= -1000000) {
return (number / 1000000).toFixed(1) + 'M'
} else {
return number.toString()}}

function segundosAHMS(segundos) {
let minutos = Math.floor((segundos % 3600) / 60)
let segundosRestantes = segundos % 60
return `${minutos} minutos y ${segundosRestantes} segundos`
}

function pickRandom(list) {
return list[Math.floor(list.length * Math.random())];
}

// Thanks to FG98
const trabajo = [
   "Trabajas como cortador de galletas y ganas",
] 
