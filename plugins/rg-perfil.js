import PhoneNumber from 'awesome-phonenumber';
import fetch from 'node-fetch';

var handler = async (m, { conn }) => {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    
    // Intentar obtener la foto de perfil con manejo de errores
    let ppUrl;
    try {
        ppUrl = await conn.profilePictureUrl(who, 'image');
    } catch (e) {
        console.error('Error obteniendo la foto de perfil:', e);
        ppUrl = 'https://files.catbox.moe/mz39y2.jpg'; // Imagen por defecto
    }

    let { premium, level, cookies, exp, registered, role } = global.db.data.users[who] || {};

    if (!global.db.data.marry) global.db.data.marry = {};
    if (!global.db.data.divorced) global.db.data.divorced = {};

    // Verificar matrimonio
    let marriage = global.db.data.marry[who] || {};
    let partnerId = marriage.partner || null;
    let startTime = marriage.startTime || null;
    let partnerName = 'Desconocid@';
if (partnerId) {
    try {
        partnerName = await conn.getName(partnerId);
    } catch (e) {
        console.error('Error obteniendo el nombre del cónyuge:', e);
    }
}

    // Calcular tiempo de casados si están casados
    let durationText = '';
    if (partnerId && startTime) {
        let elapsedTime = Date.now() - startTime;
        durationText = formatDuration(elapsedTime);
    }

    // Verificar si estuvo casado antes (divorciado)
    let divorced = global.db.data.divorced[who] || null;
    let divorcedText = '';
    if (divorced) {
        divorcedText = `💔 *Duración del matrimonio:* ${formatDuration(divorced.duration)}`;
    }

    let marriedText = partnerId
        ? `💍 *Casad@ con:* ${partnerName} (@${partnerId.replace(/@.+/, '')})\n💞 *Duración:* ${durationText}`
        : divorcedText || '💍 *Estado Civil:* Nadie te quiere 😹';

    let username = await conn.getName(who);

    let profileText = `
⚡ *PERFIL DE USUARIO*
☁️ *Nombre:* ${username}
🔰 *Tag:* @${who.replace(/@.+/, '')}
${marriedText}

🤍 *RECURSOS*
⚠️ *Nivel:* ${level || 0}
🍁 *Experiencia:* ${exp || 0}
💡 *Rango:* ${role || 'Sin rango'}

*_Provided by Juanca-Bot_*
`.trim();

    try {
        let response = await fetch(ppUrl);
        if (!response.ok) throw new Error('Error al descargar la imagen');
        let ppBuffer = await response.buffer();

        await conn.sendFile(
            m.chat,
            ppBuffer,
            'perfil.jpg',
            profileText,
            m,
            null,
            { mentions: [who, partnerId].filter(Boolean) }
        );
    } catch (e) {
        console.error('Error al enviar la imagen:', e);
        await conn.sendMessage(m.chat, { text: profileText, mentions: [who, partnerId].filter(Boolean) }, { quoted: m });
    }
};

// Función para formatear duración en días, horas, minutos y segundos
function formatDuration(ms) {
    let seconds = Math.floor(ms / 1000) % 60;
    let minutes = Math.floor(ms / (1000 * 60)) % 60;
    let hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    let days = Math.floor(ms / (1000 * 60 * 60 * 24));

    return `${days} días, ${hours}h ${minutes}m ${seconds}s`;
}

handler.help = ['perfil'];
handler.group = true;
handler.tags = ['rpg'];
handler.command = ['profile', 'perfil'];

export default handler;
