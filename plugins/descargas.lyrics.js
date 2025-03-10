import fetch from 'node-fetch';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) {
        return conn.reply(m.chat, `*Ingrese el título de una canción y el artista 🎶*\n\n> *Ejemplo :*\n> _${usedPrefix + command} quisiera - gamberroz_`, m);
    }

    try {
        // Enviar reacción de carga
        await conn.sendMessage(m.chat, { react: { text: '⏳', key: m.key } });

        // Llamar a la API
        let response = await fetch(`https://api.nyxs.pw/tools/lirik?title=${encodeURIComponent(text)}`);
        let ApiData = await response.json();

        // Verificar si la respuesta es válida
        if (!ApiData.status) {
            throw new Error('No se encontró la letra de la canción.');
        }

        let { result: lyrics } = ApiData;

        // Crear el mensaje con la letra
        let txt = ' *\`【 Lʏʀɪᴄꜱ Sᴇᴀʀᴄʜ 】\`*\n\n';
        txt += `> *❀ Canción:* _${text}_\n`;
        txt += `> *_✯ Provided by JuancaBot_*\n`;
        txt += `> *ꕤ Letra:* \n\n${lyrics}\n`.trim();

        // Enviar mensaje con la letra
        await conn.sendMessage(m.chat, { text: txt }, { quoted: m });

        // Enviar reacción de éxito
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error(error);

        // Enviar reacción de error
        await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } });

        // Responder con un mensaje de error
        await conn.reply(m.chat, '*Ocurrió un error al buscar la letra. Inténtalo nuevamente.*', m);
    }
};

handler.command = /^letra$/i;
handler.tags = ['buscador'];
handler.help = ['letra'];
handler.group = true;

export default handler;
