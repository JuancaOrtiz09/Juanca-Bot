import ws from 'ws';

async function handler(m, { conn, usedPrefix }) { // Se agregó `conn` como parámetro

const users = [...new Set([...global.conns.filter((conn) => 
  conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED)])];

function dhms(ms) {
  var segundos = Math.floor(ms / 1000);
  var minutos = Math.floor(segundos / 60);
  var horas = Math.floor(minutos / 60);
  var días = Math.floor(horas / 24);

  segundos %= 60;
  minutos %= 60;
  horas %= 24;

  var resultado = "";
  if (días !== 0) resultado += días + 'd ';
  if (horas !== 0) resultado += horas + 'h ';
  if (minutos !== 0) resultado += minutos + 'm ';
  if (segundos !== 0) resultado += segundos + 's';

  return resultado.trim();
}

const message = users.map((v, index) => 
`╭─⬣「 \`𝐒𝐔𝐁-𝐁𝐎𝐓 # ${index + 1}\`」⬣
│🎈 \`𝚃𝙰𝙶:\` @${v.user.jid.replace(/[^0-9]/g, '')}
│🔥 \`𝙻𝙸𝙽𝙺:\` https://wa.me/${v.user.jid.replace(/[^0-9]/g, '')}
│📍 \`𝙽𝙾𝙼𝙱𝚁𝙴:\` ${v.user.name || 'ꜱᴜʙ-ʙᴏᴛ'}
│⏳ \`𝚁𝚄𝙽𝚃𝙸𝙼𝙴\` ${v.uptime ? dhms(Date.now() - v.uptime) : "Desconocido"}
╰──────────────────⬣`).join('\n\n');

const replyMessage = message.length === 0 ? '🚫 *No hay Sub-Bots activos :(*' : message;
const totalUsers = users.length;

const responseMessage = 
`╭━〔 \`𝗦𝗨𝗕𝗦 - JUANCA-BOT  ̷V̷̷2̷\` 〕⬣
┃ ⚡ *Total de Sub-Bots:* ${totalUsers || '0'}
╰━━━━━━━━━━━━━━━━⬣

${replyMessage.trim()}`.trim();

await conn.sendMessage(m.chat, { 
  text: responseMessage, 
  mentions: users.map(v => v.user.jid) // Se corrigió el uso de mentions
}, { quoted: m });

}

handler.help = ['listbot'];
handler.tags = ['jadibot'];
handler.command = ['listbot', 'bss']; 

export default handler;
