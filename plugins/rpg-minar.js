let cooldowns = {}

let handler = async (m, { conn }) => {
    let user = global.db.data.users[m.sender]
    let estrellas = pickRandom([20, 5, 7, 8, 88, 40, 50, 70, 90, 999, 300])
    let iron = pickRandom([5, 6, 7, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80])
    let gold = pickRandom([20, 5, 7, 8, 88, 40, 50])
    
    let xpGanado = pickRandom([, 100, 250, 500, 1000, 2500, 5000, 7500, 10000]); // XP hasta 10,000
    
    let time = user.lastmiming + 600000
    if (new Date - user.lastmiming < 600000) {
        return conn.reply(m.chat, `*⏰ Debes esperar ${msToTime(time - new Date())} para volver a minar*`, m)
    }

    let info = `⛏️ *Te has adentrado en lo profundo de las cuevas*

> *💥 Obtuviste estos recursos:*

🌟 *Estrellas*: ${estrellas}  
🔩 *Hierro*: ${iron}  
🏅 *Oro*: ${gold}  
🎖️ *XP Ganado*: ${xpGanado} 🏆`

    conn.fakeReply(m.chat, info, '0@s.whatsapp.net', '💥 *Minando..* 💣', 'status@broadcast')
    await m.react('⛏️')

    user.health -= 50
    user.pickaxedurability -= 30
    user.estrellas += estrellas
    user.iron += iron
    user.gold += gold
    user.exp += xpGanado // Sumar XP al usuario
    user.lastmiming = new Date * 1
}

handler.help = ['minar']
handler.tags = ['rpg']
handler.command = ['minar', 'miming', 'mine']
handler.group = true
export default handler

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

function msToTime(duration) {
    var seconds = Math.floor((duration / 1000) % 60),
        minutes = Math.floor((duration / (1000 * 60)) % 60)
    minutes = (minutes < 10) ? '0' + minutes : minutes
    seconds = (seconds < 10) ? '0' + seconds : seconds
    return minutes + ' m y ' + seconds + ' s '
}
