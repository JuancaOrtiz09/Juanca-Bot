import axios from 'axios';

const handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) {
    m.react('❌');
    return conn.reply(
      m.chat,
      `*☁️ Ingrese un enlace de video de TikTok.*\n\n*💌 Ejemplo:* _${usedPrefix + command} https://vt.tiktok.com/ZS29uaYEv/_`,
      m
    );
  }

  if (!/(?:https:?\/{2})?(?:www|vm|vt|tiktok)\.com\/([^\s&]+)/gi.test(args[0])) {
    m.react('❌');
    return conn.reply(
      m.chat,
      `*☁️ Ingrese un enlace válido de TikTok.*\n\n*💌 Ejemplo:* _${usedPrefix + command} https://vt.tiktok.com/ZS29uaYEv/_`,
      m
    );
  }

  try {
    m.react('🕒');

    const response = await axios.get(`https://api.agungny.my.id/api/tiktok?url=${args[0]}`);
    const result = response.data.result;

    if (!result.status) {
      m.react('❌');
      return conn.reply(m.chat, `*🚩 Error al descargar el contenido. Por favor, intenta nuevamente más tarde.*`, m);
    }

    const { title, duration, region, author, data } = result;
    const caption = `*📌 Título:* ${title || 'No disponible'}\n*⏳ Duración:* ${duration}\n*🌍 Región:* ${region}\n*👤 Autor:* ${author.nickname}\n\n📥 *Descargado con éxito by _Juanca-Bot_.*`;

    if (data[0].type === 'photo') {
      for (const photo of data) {
        await conn.sendMessage(
          m.chat,
          {
            image: { url: photo.url },
            caption: caption,
          },
          { quoted: m }
        );
      }
      m.react('✅');
    } else {
      const videoUrl = data.find((item) => item.type === 'nowatermark_hd')?.url ||
                       data.find((item) => item.type === 'nowatermark')?.url ||
                       data.find((item) => item.type === 'watermark')?.url;

      if (!videoUrl) {
        m.react('❌');
        return conn.reply(m.chat, `*🚩 No se encontró un video válido para descargar.*`, m);
      }

      await conn.sendMessage(
        m.chat,
        {
          video: { url: videoUrl },
          caption: caption,
        },
        { quoted: m }
      );
      m.react('✅');
    }
  } catch (error) {
    console.error(error);
    m.react('❌');
    return conn.reply(
      m.chat,
      `*🌟 Ocurrió un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.*`,
      m
    );
  }
};

handler.tags = ['descargas'];
handler.help = ['tiktok'];
handler.command = ['tiktok', 'ttdl', 'tiktokdl', 'tiktoknowm', 'tt', 'ttnowm', 'tiktokaudio'];
handler.group = true;

export default handler;
