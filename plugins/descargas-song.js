import axios from 'axios';

async function getSoundCloudSearch(query) {
  const response = await axios.get(`https://bk9.fun/search/soundcloud?q=${encodeURIComponent(query)}`);
  if (response.data.status && response.data.BK9.length) {
    return response.data.BK9[0].link;
  }
  throw 'No se encontró resultado en SoundCloud.';
}

async function getSoundCloudDownload(url) {
  const response = await axios.get(`https://api.agatz.xyz/api/soundclouddl?url=${encodeURIComponent(url)}`);
  if (response.data.status === 200) {
    return response.data.data;
  }
  throw 'No se pudo obtener la descarga desde SoundCloud.';
}

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) throw `Debe proporcionar un término de búsqueda. Ejemplo: ${usedPrefix + command} vivencias`;

  try {
    m.react('🕑');
    
    // Paso 1: Buscar el primer resultado en SoundCloud
    let soundCloudLink = await getSoundCloudSearch(text);
    console.log(`Enlace de SoundCloud encontrado: ${soundCloudLink}`);

    // Paso 2: Obtener los detalles de la canción desde la API de descarga
    let songData = await getSoundCloudDownload(soundCloudLink);
    console.log(`Detalles de la canción obtenidos: ${JSON.stringify(songData)}`);

    // Paso 3: Obtener los detalles para mostrar junto al thumbnail
    const songTitle = songData.title;
    const songDuration = songData.duration;
    const songQuality = songData.quality;
    const thumbnailUrl = songData.thumbnail || 'https://qu.ax/enZMu.jpg'; // Usar thumbnail predeterminado si no está disponible
    const downloadLink = songData.download;

    const info = `🎶 *Título:* ${songTitle}
⏱ *Duración:* ${songDuration}
⚡ *Calidad:* ${songQuality}

🚀 *Enviando su audio espere por favor*

🔥 *_Provided by JuancaBot_* 🔥`;

    // Enviar la imagen thumbnail junto con la información de la canción
    await conn.sendFile(m.chat, thumbnailUrl, 'thumbnail.jpg', info, m);

    // Enviar el audio
    conn.sendMessage(m.chat, { audio: { url: downloadLink }, fileName: `${songTitle}.mp3`, mimetype: 'audio/mpeg' }, { quoted: m });

    m.react('✅');
  } catch (error) {
    m.react('❌');
    throw `Error: ${error.message || error}`;
  }
};

handler.tags = ['descargas'];
handler.help = ['song <txt>'];
handler.group = true;
handler.command = ['sc', 'song'];

export default handler;
