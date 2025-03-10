
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
const LimitAud = 725 * 1024 * 1024; //700MB
const LimitVid = 425 * 1024 * 1024; //425MB
const handler = async (m, {conn, command, args, text, usedPrefix}) => {


if (command == 'play7' || command == 'playdoc') {
  if (!text) 
    return conn.reply(
      m.chat, 
      `🧿 *Ingrese un nombre de una canción de YouTube*\n\nEjemplo: !${command} falling - Daniel Trevor`,  
      m, 
      rcanal
    );
  
  await m.react('🕛');
  const yt_play = await search(args.join(' '));
  
  const texto1 = `
┏◚◚◚◚🅓🅞🅒🅢◚◚◚◚┓

🍁 𝚃𝚒𝚝𝚞𝚕𝚘:
${yt_play[0].title}

🎀 𝙿𝚞𝚋𝚕𝚒𝚌𝚊𝚍𝚘:
${yt_play[0].ago}

⏰ 𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗:
${secondString(yt_play[0].duration.seconds)}

🖋️ 𝙰𝚞𝚝𝚘𝚛:
${yt_play[0].author.name}

🧿 𝚄𝚁𝙻:
${yt_play[0].url}

📌 𝙲𝚊𝚗𝚊𝚕:
${yt_play[0].author.url}

┗◛◛◛𒆜𝕁𝘂คกcค𝙗ŏ𝑡𒆜◛◛◛┛

*𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚜𝚞 Audio 𝙿𝚘𝚛 𝙵𝚊𝚟𝚘𝚛 𝙴𝚜𝚙𝚎𝚛𝚎*`.trim();

  await conn.sendMessage(m.chat, { text: texto1 }, { quoted: m });

  try {
    await m.react('🕛');
    const apiUrl = `https://apidl.asepharyana.cloud/api/downloader/ytmp3?url=${encodeURIComponent(yt_play[0].url)}`;
    const apiResponse = await fetch(apiUrl);
    const data = await apiResponse.json();

    if (data.downloadUrl) {
      await conn.sendMessage(
        m.chat, 
        {
          document: { url: data.downloadUrl },
          mimetype: 'audio/mpeg',
          fileName: `${data.title}.mp3`,
          caption: `🌚 *_Provided by JuancaBot_* 🌝`
        }, 
        { quoted: m }
      );
      await m.react('✅');
    } else {
      throw new Error('No se pudo obtener el enlace de descarga.');
    }
  } catch (e) {
    await m.react('❌');
    console.error(e);
    conn.reply(m.chat, `❌ *Error al obtener el audio. Intente nuevamente más tarde.*`, m);
  }
}

if (command == 'play8' || command == 'playdoc2') {
    if (!text) return conn.reply(m.chat, `🧿 *Ingrese un nombre de una canción de YouTube*\n\nEjemplo: !${command} falling - Daniel Trevor`, m, rcanal);
    await m.react('🕛');
    const yt_play = await search(args.join(' '));
    const texto1 = `
┏◚◚◚◚🅓🅞🅒🅢◚◚◚◚┓

🍁 𝚃𝚒𝚝𝚞𝚕𝚘:
${yt_play[0].title}

🎀 𝙿𝚄𝙱𝙻𝙸𝙲𝙰𝙳𝙾:
${yt_play[0].ago}

⏰ 𝙳𝚄𝚁𝙰𝙲𝙸𝙾𝙽:
${secondString(yt_play[0].duration.seconds)}

🖋️ 𝙰𝚄𝚃𝙾𝚁:
${yt_play[0].author.name}

🧿 𝚄𝚁𝙻:
${yt_play[0].url}

📌 𝙲𝙰𝙽𝙰𝙻:
${yt_play[0].author.url}

┗◛◛◛𒆜𝕁𝘂คกcค𝙗ŏ𝑡𒆜◛◛◛┛

*𝙴𝚗𝚟𝚒𝚊𝚗𝚍𝚘 𝚜𝚞 Video 𝙿𝚘𝚛 𝙵𝚊𝚟𝚘𝚛 𝙴𝚜𝚙𝚎𝚛𝚎*`.trim();

    await conn.sendMessage(m.chat, { text: texto1 }, { quoted: m });
    
    try {
    const apiUrl = `https://api.agungny.my.id/api/youtube-videov2?url=${encodeURIComponent(yt_play[0].url)}`;
    const apiResponse = await fetch(apiUrl);
    const agungData = await apiResponse.json();

    if (!agungData.status || !agungData.result?.url) {
        await m.react('❌');
        return; // Detener si no hay URL de descarga
    }

    const downloadUrl = agungData.result.url; // Enlace directo de descarga
    const fileName = `${agungData.result.title}.mp4`; // Nombre del archivo con título del video

    await conn.sendMessage(
        m.chat,
        {
            document: { url: downloadUrl },
            fileName: fileName,
            caption: `🌚 *_Provided by JuancaBot_* 🌝`,
            mimetype: 'video/mp4'
        },
        { quoted: m }
    );

    await m.react('✅');
} catch (e) {
    console.error('Error al procesar la solicitud:', e);
    await m.react('❌'); // Reaccionar con error
}
}

}
handler.help = ['play7', 'play8', 'playdoc2', 'playdoc'];
handler.tags = ['descargas'];
handler.command = ['play7', 'playdoc', 'playdoc2' , 'play8']
handler.group = true;
export default handler;

async function search(query, options = {}) {
const search = await yts.search({query, hl: 'es', gl: 'ES', ...options});
return search.videos;
}

function MilesNumber(number) {
const exp = /(\d)(?=(\d{3})+(?!\d))/g;
const rep = '$1.';
const arr = number.toString().split('.');
arr[0] = arr[0].replace(exp, rep);
return arr[1] ? arr.join('.') : arr[0];
}

function secondString(seconds) {
seconds = Number(seconds);
const d = Math.floor(seconds / (3600 * 24));
const h = Math.floor((seconds % (3600 * 24)) / 3600);
const m = Math.floor((seconds % 3600) / 60);
const s = Math.floor(seconds % 60);
const dDisplay = d > 0 ? d + (d == 1 ? ' día, ' : ' días, ') : '';
const hDisplay = h > 0 ? h + (h == 1 ? ' hora, ' : ' horas, ') : '';
const mDisplay = m > 0 ? m + (m == 1 ? ' minuto, ' : ' minutos, ') : '';
const sDisplay = s > 0 ? s + (s == 1 ? ' segundo' : ' segundos') : '';
return dDisplay + hDisplay + mDisplay + sDisplay;
  }

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer);
  } catch (error) {
    console.error("Error al obtener el buffer", error);
    throw new Error("Error al obtener el buffer");
  }
}

async function getFileSize(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        const contentLength = response.headers.get('content-length');
        return contentLength ? parseInt(contentLength, 10) : 0;
    } catch (error) {
        console.error("Error al obtener el tamaño del archivo", error);
        return 0;
    }
}

async function fetchY2mate(url) {
  const baseUrl = 'https://www.y2mate.com/mates/en60';
  const videoInfo = await fetch(`${baseUrl}/analyze/ajax`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ url, q_auto: 0 })
  }).then(res => res.json());

  const id = videoInfo.result.id;
  const downloadInfo = await fetch(`${baseUrl}/convert`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ type: 'youtube', _id: id, v_id: url, token: '', ftype: 'mp4', fquality: '360p' })
  }).then(res => res.json());

  return downloadInfo.result.url;
}

async function fetchInvidious(url) {
  const apiUrl = `https://invidious.io/api/v1/get_video_info`;

const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
const data = await response.json();

if (data && data.video) {
const videoInfo = data.video;
return videoInfo; 
} else {
throw new Error("No se pudo obtener información del video desde Invidious");
  }
}

async function fetch9Convert(url) {
const apiUrl = `https://9convert.com/en429/api`;
const response = await fetch(`${apiUrl}?url=${encodeURIComponent(url)}`);
const data = await response.json();

if (data.status === 'ok') {
    return data.result.mp3;
  } else {
    throw new Error("No se pudo obtener la descarga desde 9Convert");
  }
}
