const handler = async (m, { conn, args }) => { 
  if (!args[0]) { 
    return conn.reply(m.chat, '🎈 *Ingresa un link de Facebook*', m);
  }

  // Verificación válida del enlace de Facebook
  const facebookRegex = /^(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)\/.+$/;
  if (!facebookRegex.test(args[0])) { 
    return conn.reply(m.chat, '❌ *El enlace proporcionado no es válido. Asegúrate de ingresar un enlace correcto de Facebook.*', m);
  }

  let res;
  try {
    await m.react('⏳'); // Reacción de espera
    const response = await fetch(`https://api.dorratz.com/fbvideo?url=${encodeURIComponent(args[0])}`);
    res = await response.json();
  } catch (err) {
    await m.react('❌');
    return conn.reply(m.chat, '❎ *Error al obtener datos. Verifica el enlace.*', m);
  }

  if (!res || res.length === 0) { 
    return conn.reply(m.chat, '⚠️ *No se encontraron resultados.*', m);
  }

  // Buscar la calidad mínima 360p (SD)
  const data = res.find((i) => i.resolution === '360p (SD)');

  if (!data) { 
    return conn.reply(m.chat, '🚩 *No se encontró una resolución adecuada.*', m);
  }

  let video = data.url;
  try {
    await m.react('📤'); // Reacción de envío
    await conn.sendMessage(m.chat, { 
      video: { url: video }, 
      caption: '🎈 *Tu video de Facebook by Juanca-Bot.*', 
      fileName: 'facebook_video.mp4', 
      mimetype: 'video/mp4' 
    }, { quoted: m });
    await m.react('✅'); // Reacción de éxito
  } catch (err) {
    await m.react('❌');
    return conn.reply(m.chat, '❌ *Error al enviar el video.*', m);
  }
};

handler.help = ['facebook', 'fb'];
handler.tags = ['descargas'];
handler.command = ['facebook', 'fb'];
handler.group = true;

export default handler;
