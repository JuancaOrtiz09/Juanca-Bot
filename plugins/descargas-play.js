import { youtubedl, youtubedlv2 } from '@bochilteam/scraper'
import fetch from 'node-fetch'
import yts from 'yt-search'
import ytdl from 'ytdl-core'
import axios from 'axios'
import fs from 'fs'
import { exec } from 'child_process'
//import { execSync } from 'child_process'
const LimitAud = 725 * 1024 * 1024; //700MB
const LimitVid = 425 * 1024 * 1024; //425MB
const handler = async (m, {conn, command, args, text, usedPrefix}) => {


if (command === 'playp') {
        if (!text) return conn.reply(m.chat, `*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚗𝚘𝚖𝚋𝚛𝚎 𝚍𝚎 𝚕𝚘 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚎𝚜 𝚋𝚞𝚜𝚌𝚊𝚛*`, m, rcanal);

        await m.react('🕓');

        // Buscar en YouTube
        const yt_play = await search(args.join(' '));

        const texto1 = `
𝚈𝚘𝚞𝚝𝚞𝚋𝚎 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜
===========================

> *𝚃𝚒𝚝𝚞𝚕𝚘* :  ${yt_play[0].title}

> *𝙲𝚛𝚎𝚊𝚍𝚘* :  ${yt_play[0].ago}

> *𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗* :  ${secondString(yt_play[0].duration.seconds)}

*🚀 𝙎𝙀 𝙀𝙎𝙏𝘼 𝘿𝙀𝙎𝘼𝙍𝙂𝘼𝙉𝘿𝙊 𝙎𝙐 𝘼𝙐𝘿𝙄𝙊, 𝙀𝙎𝙋𝙀𝙍𝙀 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊*

===========================
✰ Juanca-Bot ✰
> *Provided by JuancaOrtiz*
`.trim();

        await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null);
try {
    await m.react('🕓'); // Reacciona mientras procesa

    const url = yt_play[0].url;
    const apiUrl = `https://delirius-apiofc.vercel.app/download/ytmp3?url=${encodeURIComponent(url)}`;

    const apiResponse = await fetch(apiUrl);
    const response = await apiResponse.json();

    if (response.status && response.data && response.data.download && response.data.download.url) {
        const { title, download } = response.data;

        await conn.sendMessage(m.chat, {
            audio: { url: download.url },
            mimetype: 'audio/mp4',
            fileName: `${title}.mp3`,
            ptt: false
        }, { quoted: m });

        await m.react('✅'); // Éxito
    } else {
        throw new Error('No se pudo obtener el enlace desde la API de Delirius.');
    }

} catch (err) {
    
   try {
    await m.react('🕓'); // Indicador de procesamiento

    const url = yt_play[0].url;
    const format = 'mp3';
    const apiUrl = `https://itzpire.com/download/youtube/v2?url=${encodeURIComponent(url)}&format=${format}`;

    const apiResponse = await fetch(apiUrl);
    const response = await apiResponse.json();

    if (response.status === 'success' && response.data && response.data.downloadUrl) {
        const { title, downloadUrl } = response.data;

        await conn.sendMessage(m.chat, {
            audio: { url: downloadUrl },
            mimetype: 'audio/mp4', // mp3 se puede enviar con este tipo
            fileName: `${title}.mp3`,
            ptt: false
        }, { quoted: m });

        await m.react('✅'); // Éxito
    } else {
        throw new Error('No se pudo obtener el enlace desde la API de ITzpire.');
    }

} catch (err) {

try {
    await m.react('🕓'); // Reacciona mientras procesa

    const url = yt_play[0].url;
    const apiUrl = `https://bk9.fun/download/ytmp3?url=${encodeURIComponent(url)}&type=mp3`;

    const apiResponse = await fetch(apiUrl);
    const response = await apiResponse.json();

    if (response.status && response.BK9?.downloadUrl) {
        const { title, downloadUrl } = response;
        await conn.sendMessage(m.chat, {
            audio: { url: downloadUrl },
            mimetype: 'audio/mp4',
            fileName: `${title}.mp3`,
            ptt: false
        }, { quoted: m });

        await m.react('✅'); // Éxito
    } else {
        throw new Error('No se pudo obtener el enlace desde la primera API.');
    }

} catch (e) {
    try {
    await m.react('🕓'); // Reacciona mientras procesa

    const url = yt_play[0].url; // Asegúrate de que yt_play[0].url esté definido
    const apiKey = 'i1fER4';
    const apiUrl = `https://alyachan.dev/api/yta?url=${encodeURIComponent(url)}&apikey=${apiKey}`;

    const apiResponse = await fetch(apiUrl);
    const response = await apiResponse.json();

    if (response.status && response.data && response.data.url) {
        const { title, data } = response;

        await conn.sendMessage(m.chat, {
            audio: { url: data.url },
            mimetype: 'audio/mp4',
            fileName: `${title}.mp3`,
            ptt: false
        }, { quoted: m });

        await m.react('✅'); // Éxito
    } else {
        throw new Error('No se pudo obtener el enlace desde la API de AlyaChan.');
    }

} catch (err) {

    try {
    await m.react('🕓'); // Reacciona mientras procesa

    const url = yt_play[0].url;
    const apiUrl = `https://api.sylphy.xyz/download/ytmp3?url=${encodeURIComponent(url)}`;

    const apiResponse = await fetch(apiUrl);
    const response = await apiResponse.json();

    if (response.status && response.res && response.res.url) {
        const { title, url: audioUrl } = response.res;

        await conn.sendMessage(m.chat, {
            audio: { url: audioUrl },
            mimetype: 'audio/mp4',
            fileName: `${title}.mp3`,
            ptt: false
        }, { quoted: m });

        await m.react('✅'); // Éxito
    } else {
        throw new Error('No se pudo obtener el enlace desde la API de Sylphy.');
    }

} catch (err) {

    try {
        await m.react('🕓'); // Reintenta con la segunda API

        const url = yt_play[0].url;
        const apiUrl = `https://apidl.asepharyana.cloud/api/downloader/ytmp3?url=${encodeURIComponent(url)}`;

        const apiResponse = await fetch(apiUrl);
        const response = await apiResponse.json();

        if (response.url) {
            const { title, url: audioUrl } = response;
            await conn.sendMessage(m.chat, {
                audio: { url: audioUrl },
                mimetype: 'audio/mp4',
                fileName: `${title}.mp3`,
                ptt: false
            }, { quoted: m });

            await m.react('✅'); // Éxito
        } else {
            throw new Error('No se pudo obtener el enlace desde la segunda API.');
        }

    } catch (err) {
        await m.react('❌');
        console.error('Error al procesar el audio:', err);
        m.reply('No se pudo obtener el audio intente con `playp2`.');
    }
}
}
}
}
}
//
    }

if (command == 'play2') {
    if (!text) return conn.reply(m.chat, `*𝙸𝚗𝚐𝚛𝚎𝚜𝚊 𝚎𝚕 𝚗𝚘𝚖𝚋𝚛𝚎 𝚍𝚎 𝚕𝚘 𝚚𝚞𝚎 𝚚𝚞𝚒𝚎𝚛𝚎𝚜 𝚋𝚞𝚜𝚌𝚊𝚛*`, m, rcanal);
    
    await m.react('🕓'); 

    const yt_play = await search(args.join(' '));
    
    // Validación de duración
    const duracionSegundos = yt_play[0].duration.seconds || 0;
    if (duracionSegundos > 3600) {
        return conn.reply(m.chat, `❌ *El video supera la duración máxima permitida de 1 hora.*\n\n📌 *Duración del video:* ${secondString(duracionSegundos)} Esto no es Amazon Prime Video`, m);
    }

    const texto1 = `
𝚈𝚘𝚞𝚝𝚞𝚋𝚎 𝙳𝚎𝚜𝚌𝚊𝚛𝚐𝚊𝚜
===========================

> *𝚃𝚒𝚝𝚞𝚕𝚘* :  ${yt_play[0].title}

> *𝙲𝚛𝚎𝚊𝚍𝚘* :  ${yt_play[0].ago}

> *𝙳𝚞𝚛𝚊𝚌𝚒𝚘𝚗* :  ${secondString(duracionSegundos)}

*🚀 𝙎𝙀 𝙀𝙎𝙏𝘼 𝘿𝙀𝙎𝘼𝙍𝙂𝘼𝙉𝘿𝙊 𝙎𝙐 𝙑𝙄𝘿𝙀𝙊, 𝙀𝙎𝙋𝙀𝙍𝙀 𝙐𝙉 𝙈𝙊𝙈𝙀𝙉𝙏𝙊*

===========================
✰ Juanca-Bot ✰
> *Provided by JuancaOrtiz
`.trim();

    await conn.sendFile(m.chat, yt_play[0].thumbnail, 'error.jpg', texto1, m, null);

try {
    await m.react('🕓');
    const url = yt_play[0].url;

    const api2 = await fetch(`https://delirius-apiofc.vercel.app/download/ytmp4?url=${encodeURIComponent(url)}`);
    const res2 = await api2.json();

    if (res2.status && res2.data?.download?.url) {
        const { title, duration, views, author } = res2.data;
        const downloadUrl = res2.data.download.url;

        await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            caption: `*${title}*\nDuración: ${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, '0')} minutos\nVistas: ${views}\nCanal: ${author}`
        }, { quoted: m });

        await m.react('✅');
        return; // ✅ Éxito, no continuar con otras APIs
    }
} catch (e) {
    console.warn('Error en API 2 (Delirius):', e);
}
try {
    await m.react('🕓');
    const url = yt_play[0].url;

    const api5 = await fetch(`https://www.dark-yasiya-api.site/download/ytmp4?url=${encodeURIComponent(url)}&quality=360`);
    const res5 = await api5.json();

    if (res5?.status && res5.result?.download?.url) {
        const video = res5.result.data;
        const download = res5.result.download;

        await conn.sendMessage(m.chat, {
            video: { url: download.url },
            caption: `🎬 *${video.title}*\n👤 Autor: ${video.author.name}\n🕒 Duración: ${video.duration.timestamp}\n👁️ Vistas: ${video.views}\n📥 Calidad: ${download.quality}p`
        }, { quoted: m });

        await m.react('✅');
        return; // ✅ Éxito, no continuar con otras APIs
    }
} catch (e) {
    console.warn('Error en API 5 (DarkYasiya):', e);
}
try {
    await m.react('🕓');
    const url = yt_play[0].url;

    const apiAlya = await fetch(`https://api.alyachan.dev/api/ytv?url=${encodeURIComponent(url)}&apikey=i1fER4`);
    const resAlya = await apiAlya.json();

    if (resAlya.status && resAlya.data?.url) {
        const {
            title,
            duration,
            channel,
            views,
            publish,
            thumbnail,
            data
        } = resAlya;

        await conn.sendMessage(m.chat, {
            video: { url: data.url },
            caption: `🎬 *${title}*\n🕒 Duración: ${duration}\n👤 Canal: ${channel}\n👁️ Vistas: ${views}\n📅 Publicado: ${publish}\n📥 Calidad: ${data.quality} - ${data.size}`
        }, { quoted: m });

        await m.react('✅');
        return; // ✅ Éxito, no continuar con otras APIs
    }
} catch (e) {
    console.warn('Error en API (AlyaChan):', e);
}
try {
    await m.react('🕓');
    const url = yt_play[0].url;

    const apiSylphy = await fetch(`https://api.sylphy.xyz/download/ytmp4?url=${encodeURIComponent(url)}`);
    const resSylphy = await apiSylphy.json();

    if (resSylphy.status && resSylphy.res?.url) {
        const { title, url: videoUrl } = resSylphy.res;

        await conn.sendMessage(m.chat, {
            video: { url: videoUrl },
            caption: `🎬 *${title}*`
        }, { quoted: m });

        await m.react('✅');
        return; // ✅ Éxito, no continuar con otras APIs
    }
} catch (e) {
    console.warn('Error en API (Sylphy):', e);
}

    try {
    await m.react('🕓');
    const url = yt_play[0].url;

    const api3 = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`);
    const res3 = await api3.json();

    if (res3.status === 200 && res3.result?.download?.url) {
        const {
            metadata: { title, timestamp, views, author },
            download: { url: downloadUrl }
        } = res3.result;

        await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            caption: `🎬 *${title}*\n📺 Duración: ${timestamp}\n👀 Vistas: ${views.toLocaleString()}\n🎙 Autor: ${author.name}\n🔗 Canal: ${author.url}`
        }, { quoted: m });

        await m.react('✅');
        return; // ✅ Éxito
    }
} catch (e) {
    console.warn('Error en API 3:', e);
}
    


// Si falla la primera, pasa a la siguiente
try {
    await m.react('🕓');
    const url = yt_play[0].url;

    const api2 = await fetch(`https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(url)}&type=video&quality=720p&apikey=Paimon`);
    const res2 = await api2.json();

    if (res2.status && res2.data?.url) {
        const { title, fduration, views, channel } = res2;
        const { url: downloadUrl } = res2.data;

        await conn.sendMessage(m.chat, {
            video: { url: downloadUrl },
            caption: `*${title}*\nDuración: ${fduration}\nVistas: ${views}\nCanal: ${channel}`
        }, { quoted: m });

        await m.react('✅');
        return; // ✅ Éxito, no continuar con otras APIs
    }
} catch (e) {
    console.warn('Error en API 2:', e);
}

// Si falla la segunda, pasa a la tercera

try {
    await m.react('🕓');
    const url = yt_play[0].url;

    const api1 = await fetch('https://api.siputzx.my.id/api/d/ytmp4', {
        method: 'POST',
        headers: {
            'accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url })
    });

    const res1 = await api1.json();

    if (res1.status && res1.data?.dl) {
        const { title, dl } = res1.data;
        await conn.sendMessage(m.chat, {
            video: { url: dl },
            caption: `🎬 *${title}*`
        }, { quoted: m });

        await m.react('✅');
        return; // ✅ Éxito, no continuar con otras APIs
    }
} catch (e) {
    console.warn('Error en API 1:', e);
}


// Si todas fallan:
await m.react('❌');
m.reply('❌ No se pudo obtener el video con ninguna de las APIs. Intenta con otro enlace o usa el comando playv2.');
//
}


}
handler.help = ['playp', 'play2'];
handler.tags = ['descargas'];
handler.command = ['play2', 'playp']
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

/*
import yts from 'yt-search';
import fetch from 'node-fetch';
let limit = 320;
let confirmation = {};

let handler = async (m, { conn, command, text, args, usedPrefix }) => {
    if (!text) throw `✳️ Ejemplo: *${usedPrefix + command}* Lil Peep hate my life`;

    let res = await yts(text);
    let vid = res.videos[0];
    if (!vid) throw `✳️ Vídeo/Audio no encontrado`;

    let { title, thumbnail, videoId, timestamp, views, ago, url } = vid;

    m.react('🎧');

    let playMessage = `
≡ *YOUTUBE MUSIC*
┌──────────────
▢ 📌 *Título:* ${title}
▢ 📆 *Subido hace:* ${ago}
▢ ⌚ *Duración:* ${timestamp}
▢ 👀 *Vistas:* ${views.toLocaleString()}
└──────────────`;

    conn.sendButton(m.chat, playMessage, null, thumbnail, [
        ['🎶 MP3', `${usedPrefix}yta ${url}`],
        ['🎥 MP4', `${usedPrefix}ytv ${url}`]
    ], m);
};

handler.help = ['play'];
handler.tags = ['descargas'];
handler.command = ['play', 'play2'];
handler.disabled = false;
handler.group = true;

export default handler;
*/
