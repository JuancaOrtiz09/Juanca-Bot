const ownerBot = global.owner[573163963499] + '@s.whatsapp.net';

const handler = async (m, {conn, usedPrefix, command}) => {
  const isOwner = m.sender === ownerBot;

  // Solo verifica el tiempo de espera si el usuario no es el owner
  if (!isOwner) {
    const time = global.db.data.users[m.sender].lastrob + 7200000;
    if (new Date - global.db.data.users[m.sender].lastrob < 7200000) {
      conn.reply(m.chat, `*💥 𝑯𝒆𝒚! 𝑬𝒔𝒑𝒆𝒓𝒂 ${msToTime(time - new Date())} 𝒑𝒂𝒓𝒂 𝒗𝒐𝒍𝒗𝒆𝒓 𝒂 𝒓𝒐𝒃𝒂𝒓*`, m, rcanal);
      return;
    }
  }

  let who;
  if (m.isGroup) who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
  else who = m.chat;
  if (!who) {
    conn.reply(m.chat, `*💥 𝑬𝒕𝒊𝒒𝒖𝒆𝒕𝒂 𝒂 𝒂𝒍𝒈𝒖𝒊𝒆𝒏 𝒑𝒂𝒓𝒂 𝒓𝒐𝒃𝒂𝒓.*`, m, rcanal);
    return;
  }

  if (who === ownerBot) {
    conn.reply(m.chat, `*💥 No puedes robar XP al dueño del bot.*`, m, rcanal);
    return;
  }

  if (!(who in global.db.data.users)) {
    conn.reply(m.chat, `*💥 𝑬𝒍 𝒖𝒔𝒖𝒂𝒓𝒊𝒐 𝒏𝒐 𝒔𝒆 𝒆𝒏𝒄𝒖𝒆𝒏𝒕𝒓𝒂 𝒆𝒏 𝒎𝒊 𝒃𝒂𝒔𝒆 𝒅𝒆 𝒅𝒂𝒕𝒐𝒔 😕.*`, m, rcanal);
    return;
  }

  const users = global.db.data.users[who];
  const rob = users.exp;  // Roba todo el XP disponible

  if (rob <= 0) {
    conn.reply(m.chat, `😔 @${who.split`@`[0]} no tiene XP para robar.`, m, {mentions: [who]});
    return;
  }

  global.db.data.users[m.sender].exp += rob;
  global.db.data.users[who].exp -= rob;
  conn.reply(m.chat, `*🔥 𝑹𝒐𝒃𝒂𝒔𝒕𝒆 ${rob} XP 𝒂 @${who.split`@`[0]}*`, m, {mentions: [who]});

  // Solo establece el tiempo de espera para usuarios que no sean el owner
  if (!isOwner) global.db.data.users[m.sender].lastrob = new Date * 1;
};

handler.help = ['roball'];
handler.tags = ['rpg'];
handler.command = [ 'roball'];
handler.group = true;
export default handler;

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);
  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;
  seconds = (seconds < 10) ? '0' + seconds : seconds;
  return hours + ' Hora(s) ' + minutes + ' Minuto(s)';
}
