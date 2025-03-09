/*var handler = async (m, { conn, text, usedPrefix, command}) => {

let user, number, bot, bant, ownerNumber, aa, users, usr, q, mime, img

try {
function no(number){
return number.replace(/\s/g,'').replace(/([@+-])/g,'')}
text = no(text)
if(isNaN(text)) {
number = text.split`@`[1]
} else if(!isNaN(text)) {
number = text
}
user = conn.user.jid.split`@`[0] + '@s.whatsapp.net'
bot = conn.user.jid.split`@`[0] 
bant = `🚩 *Etiquete a una persona*\n\nEjemplo, !${command} @${global.suittag}`
const nn = conn.getName(m.sender);
if (!text && !m.quoted) return conn.reply(m.chat, bant, m, { mentions: [user] })               
try {
if(text) {
user = number + '@s.whatsapp.net'
} else if(m.quoted.sender) {
user = m.quoted.sender
} else if(m.mentionedJid) {
user = number + '@s.whatsapp.net'
}} catch (e) {
} finally {
number = user.split('@')[0]
if(user === conn.user.jid) return conn.reply(m.chat, `🚩 @${bot} *No puede ser baneado con este comando*`, m, { mentions: [user] })   
for (let i = 0; i < global.owner.length; i++) {
ownerNumber = global.owner[i][0];
if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
aa = ownerNumber + '@s.whatsapp.net'
await conn.reply(m.chat, `🚩 *No puedo banear al propietario @${ownerNumber} de ${dev}*`, m, { mentions: [aa] })
return
}}
users = global.db.data.users
if (users[user].banned === true) conn.reply(m.chat, `🚩 *No es necesario volver a banear a @${number}*`, m, { mentions: [user] }) 
users[user].banned = true
usr = m.sender.split('@')[0]     
await conn.reply(m.chat, '✅ *Usuario baneado con éxito*', m, { mentions: [user] })   
}} catch (e) {
await conn.reply(m.chat, '🚩 *Ocurrió un fallo*', m, rcanal, )
console.log(e) 
}

}
handler.help = ['banuser <@tag> <razón>'];
handler.command = ['banuser'];
handler.tags = ['owner'];
handler.group = true;
handler.rowner = true;
export default handler
*/
var handler = async (m, { conn, text, args, usedPrefix, command }) => {  
    const ownerNumber = '573163963499'; // Reemplázalo con tu número sin @s.whatsapp.net

    if (m.sender.replace(/@s\.whatsapp\.net$/, '') !== ownerNumber) {
        return conn.reply(m.chat, '⚠️ *No tienes permisos para usar este comando.*', m);
    }

    let user, number, bot, owner, aa, users;  

    try {  
        function no(number) {  
            return number.replace(/\s/g, '').replace(/([@+-])/g, '');  
        }  

        let reason = args.slice(1).join(' ') || 'Spam';  

        if (!args[0] && !m.quoted && !m.mentionedJid) {  
            return conn.reply(m.chat, `💡 *Proporcione un número, mencione a alguien o responda a un mensaje.*\n\nEjemplo:\n- *${usedPrefix}${command} @usuario razón*\n- *${usedPrefix}${command} +573222356632 razón*`, m);  
        }  

        number = args[0] ? no(args[0]) : null;  

        if (args[0] && !isNaN(number)) {  
            user = number + '@s.whatsapp.net';  
        } else if (m.quoted && m.quoted.sender) {  
            user = m.quoted.sender;  
        } else if (m.mentionedJid && m.mentionedJid[0]) {  
            user = m.mentionedJid[0];  
        }  

        if (!user) {  
            return conn.reply(m.chat, `❎ *No se pudo determinar el usuario.*`, m);  
        }  

        bot = conn.user.jid.split`@`[0];  
        if (user === conn.user.jid) {  
            return conn.reply(m.chat, `✴️ @${bot} *No puede ser baneado con este comando.*`, m, { mentions: [user] });  
        }  

        users = global.db.data.users;  

        if (!users[user]) {  
            return conn.reply(m.chat, `🍁 *El usuario no está registrado en la base de datos.*`, m);  
        }  

        if (users[user].banned === true) {  
            return conn.reply(m.chat, `⚡ *El usuario ya está baneado.*`, m, { mentions: [user] });  
        }  

        users[user].banned = true;  
        users[user].bannedReason = reason;  

        await conn.reply(m.chat, `✅ *Usuario baneado con éxito.*\n\n💌 *Razón:* ${reason}`, m, { mentions: [user] });  
    } catch (e) {  
        console.error(e);  
        await conn.reply(m.chat, '❌ *Ocurrió un error inesperado.*', m);  
    }  
};  

handler.help = ['banuser <@tag|número> <razón>'];  
handler.command = ['banuser'];  
handler.tags = ['owner'];  
handler.rowner = true;  

export default handler;
