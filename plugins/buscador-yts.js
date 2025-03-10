import yts from 'yt-search';

const handler = async (m, { text, conn, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🏳 *Escriba el título de algún vídeo de YouTube*\n\nEjemplo: ${usedPrefix + command} heyser`, m);

    let results = await yts(text);
    let videos = results.videos.slice(0, 6); // Máximo 4 videos para el carrusel

    if (!videos.length) return conn.reply(m.chat, '⚠️ No se encontraron resultados.', m);

let messages = videos.map(video => [
    video.title,
    `🎬 *Título:* ${video.title}\n⏱ *Duración:* ${video.timestamp}\n📅 *Subido:* ${video.ago}\n🎈 para descargar copee y pegue el comando:\n⟨∆⟩ boton 1 mp3\n⟨∆⟩ boton 2 mp4\n\n「✰」 provided by Juanca-Bot`,
    video.thumbnail,
    [[]], [ [ `/ytmp3 ${video.url}`], [ `/ytmp4 ${video.url}`] ]
]);

await conn.sendCarousel(m.chat, `🔎 Resultados para: *${text}*`, '📺 YouTube Search', null, messages, m);
};

handler.help = ['ytsearch'];
handler.tags = ['buscador'];
handler.command = /^playlist|ytbuscar|yts(earch)?$/i;
handler.group = true;

export default handler;



