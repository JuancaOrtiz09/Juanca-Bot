let handler = async (m) => {

global.db.data.chats[m.chat].isBanned = true
conn.reply(m.chat, `✅ *JuancaBot Ha Sido Desactivado En Este Chat*`, m, )

}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = ['banchat', 'offkan']
handler.rowner = true;
//handler.group = true;
export default handler
