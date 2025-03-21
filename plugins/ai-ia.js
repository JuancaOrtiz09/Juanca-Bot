import fetch from 'node-fetch';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) {
        return conn.reply(m.chat, `💡 *Ingrese su petición*\n⚡ *Ejemplo de uso:* ${usedPrefix + command} Hola, ¿cómo estás?`, m);
    }

    try {
        await m.react('💭');

        const response = await fetch(`https://mahiru-shiina.vercel.app/ai/chatgpt4?text=${encodeURIComponent(text)}`);
        const data = await response.json();

        if (data.status && data.answer) {
            await conn.reply(m.chat, `*Hola!👋 soy Juanca-Boy Provided By Juanca Ortiz*:\n${data.answer}`, m);
        } else {
            await m.react('❌');
            await conn.reply(m.chat, '❌ Error: No se obtuvo una respuesta válida.', m);
        }
    } catch (error) {
        await m.react('❌');
        console.error('❌ Error al obtener la respuesta:', error);
        await conn.reply(m.chat, 'Error: intenta más tarde.', m);
    }
};

handler.help = ['ia <texto>'];
handler.tags = ['ai'];
handler.command = ['ia', 'chatgpt'];
handler.group = true;

export default handler;
