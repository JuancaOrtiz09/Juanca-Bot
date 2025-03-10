import fetch from 'node-fetch';

let handler = async (m, { conn: star, args }) => {
  if (!args || !args[0]) 
    return star.reply(m.chat, '💣 _*Ingresa el enlace del video de YouTube junto al comando.*_\n\n`Ejemplo:`\n> *!ytmp4doc* https://youtube.com/watch?v=qHDJSRlNhVs', m, );

  if (!args[0].match(/youtu/gi)) 
    return star.reply(m.chat, `Verifica que el enlace sea de YouTube.`, m, rcanal).then(() => m.react('✖️'));

  await m.react('🕓'); // Reaccionar con reloj mientras procesa

try {
    let v = args[0];

    // Llamada a la API
    let apiResponse = await fetch(`https://api.agungny.my.id/api/youtube-videov2?url=${encodeURIComponent(v)}`);
    let data = await apiResponse.json();

    if (!data.result || !data.result.url || !data.result.title) {
        throw new Error('Error en la API');
    }

    let { title, url: download_url } = data.result;

    let txt = '`🅓🅞🅒🅢 🅥➋ - 𒆜𝕁𝘂คกcค𝙗ŏ𝑡𒆜`\n\n';
    txt += `	🍁   *Título*: ${title}\n\n`;
    txt += `> ️ *Se está enviando su video, por favor espere*`;

    await star.reply(m.chat, txt, m);

    await star.sendMessage(m.chat, {
        document: { url: download_url }, 
        caption: `🌝 *Provided by JuancaBot* 🌚`,
        mimetype: 'video/mp4',
        fileName: `${title}.mp4`
    }, { quoted: m });

    return await m.react('✅'); // Reaccionar con éxito
} catch (error) {
    console.error("Error en la API:", error.message);
    await m.react('✖️');
    await star.reply(m.chat, '❌ _*Error al procesar el enlace. Por favor, intenta de nuevo.*_', m);
}

};

handler.help = ['ytmp4doc *<link yt>*'];
handler.tags = ['descargas'];
handler.command = ['ytmp4doc', 'yt4doc'];
handler.group = true;

export default handler;
