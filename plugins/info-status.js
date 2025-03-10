import { performance } from 'perf_hooks';
import os from 'os';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
    let uptimeBot = process.uptime(); // Tiempo de actividad del bot en segundos
    let uptimeSystem = os.uptime(); // Tiempo de actividad del sistema en segundos

    // Latencia del bot
    let start = performance.now();
    let end = performance.now();
    let speed = (end - start).toFixed(3); // Latencia en milisegundos

    // Uso de memoria
    let memUsed = process.memoryUsage();
    let totalMem = os.totalmem();
    let freeMem = os.freemem();
    let usedMem = totalMem - freeMem;

    // Obtener información de la IP pública para detectar país y zona horaria
    let ipData = await fetch('https://ipapi.co/json/')
        .then(res => res.json())
        .catch(() => null);

    let country = ipData ? `${ipData.country_name} (${ipData.country_code})` : 'Desconocido';
    let timezone = ipData ? ipData.timezone : 'Desconocido';

    let status = `「 *ꜱᴛᴀᴛᴜꜱ ꜱᴇʀᴠᴇʀ* 」\n\n` +
        `✦ *ᴜʙɪᴄᴀᴄɪóɴ*: ${country}\n` +
        `✦ *ᴢᴏɴᴀ ʜᴏʀᴀʀɪᴀ*: ${timezone}\n\n` +
        `✯ *ᴜᴘᴛɪᴍᴇ ʙᴏᴛ*: ${formatTime(uptimeBot)}\n` +
        `✯️ *ᴜᴘᴛɪᴍᴇ ꜱɪꜱᴛᴇᴍ*: ${formatTime(uptimeSystem)}\n` +
        `✯ *ʟᴀᴛᴇɴᴄɪᴀ*: ${speed} ms\n\n` +
        `➛ *ʀᴀᴍ ᴜꜱᴀᴅᴀ*: ${(memUsed.rss / 1024 / 1024).toFixed(2)} MB\n` +
        `➛ *ʀᴀᴍ ᴛᴏᴛᴀʟ*: ${(totalMem / 1024 / 1024 / 1024).toFixed(2)} GB\n` +
        `➛ *ʀᴀᴍ ʟɪʙʀᴇ*: ${(freeMem / 1024 / 1024 / 1024).toFixed(2)} GB\n\n`+
        `*« ᴘʀᴏᴠɪᴅᴇᴅ ʙʏ juanca »*` ;

    await conn.sendMessage(m.chat, { text: status }, { quoted: m });
};

handler.help = ['status'];
handler.tags = ['main'];
handler.command = ['estado', 'status', 'server'];

export default handler;

function formatTime(seconds) {
    let d = Math.floor(seconds / 86400);
    let h = Math.floor((seconds % 86400) / 3600);
    let m = Math.floor((seconds % 3600) / 60);
    let s = Math.floor(seconds % 60);
    return `${d}d ${h}h ${m}m ${s}s`;
}
