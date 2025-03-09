let handler = async (m, { conn }) => {
if (!(m.chat in global.db.data.chats)) return conn.reply(m.chat, '🍭 *¡ESTE CHAT NO ESTÁ REGISTRADO!*', m, )
let chat = global.db.data.chats[m.chat]
if (!chat.isBanned) return conn.reply(m.chat, '🌥️ *¡JUANCA-BOT NO ESTÁ BANEADO EN ESTE CHAT!*', m, )
chat.isBanned = false
await conn.reply(m.chat, '💡 *¡JUANCA-BOT HA SIDO DESBANEADO EN ESTE CHAT!*', m, )
}
handler.help = ['unbanchat'];
handler.tags = ['owner'];
handler.command = ['unbanchat','onkan','desbanchat']
handler.rowner = true;

//handler.group = true

export default handler
