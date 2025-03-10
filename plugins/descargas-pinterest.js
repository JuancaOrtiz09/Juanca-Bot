const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `*💡 Uso Correcto: ${usedPrefix + command} gatos*`, m);

    // Lista de palabras prohibidas
    const prohibited = [
        'se men', 'hen tai', 'se xo', 'te tas', 'cu lo', 'c ulo', 'cul o',
        'ntr', 'rule34', 'rule', 'caca', 'polla', 'femjoy', 'porno',
        'porn', 'gore', 'onlyfans', 'sofiaramirez01', 'kareli', 'karely',
        'cum', 'semen', 'nopor', 'puta', 'puto', 'culo', 'putita', 'putito',
        'pussy', 'hentai', 'pene', 'coño', 'asesinato', 'zoofilia',
        'mia khalifa', 'desnudo', 'desnuda', 'cuca', 'chocha', 'muertos',
        'pornhub', 'xnxx', 'xvideos', 'teta', 'vagina', 'marsha may',
        'misha cross', 'sexmex', 'furry', 'furro', 'furra', 'xxx',
        'rule34', 'panocha', 'pedofilia', 'necrofilia', 'pinga',
        'horny', 'ass', 'nude', 'popo', 'nsfw', 'femdom', 'futanari',
        'erofeet', 'sexo', 'sex', 'yuri', 'ero', 'ecchi', 'blowjob',
        'anal', 'ahegao', 'pija', 'verga', 'trasero', 'violation',
        'violacion', 'bdsm', 'cachonda', '+18', 'cp', 'mia marin',
        'lana rhoades', 'porn', 'cepesito', 'hot', 'buceta', 'xxx', 'nalga',
        'nalgas'
    ];

    // Verificación de palabras prohibidas
    const foundProhibitedWord = prohibited.find(word => text.toLowerCase().includes(word));
    if (foundProhibitedWord) {
        return conn.reply(m.chat, `⚠️ *No daré resultado a tu solicitud por pajin* - Palabra prohibida: ${foundProhibitedWord}`, m);
    }

    // Respuesta mientras se descarga la imagen
    await m.react('📌');

    try {
        const res = await fetch(`https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(text)}`);
        const json = await res.json();

        if (!json.status || !json.data.length) {
            return conn.reply(m.chat, `❌ No encontré resultados para *${text}*`, m);
        }

       const messages = json.data.slice(0, 6).map(item => [ 
    `📍 ${item.grid_title || 'Imagen sin título'}`, // Agregar el emoji aquí
    `️💎 *Create:* ${item.created_at}`,
    item.images_url,
    [[]],
    [[item.pin]], [[]], [[]]
]);

        await conn.sendCarousel(m.chat, `🔎 Resultados de *${text}*`, '⚡ Juanca-Bot ⚡', null, messages, m);
        await m.react('✅');

    } catch (e) {
        console.error(e);
        await conn.reply(m.chat, `❌ Error al buscar imágenes. Inténtalo de nuevo.`, m);
    }
};

handler.help = ['pinterest <query>'];
handler.tags = ['buscador'];
handler.command = ['pinterest', 'pin', 'pimg'];
handler.group = true;
export default handler;
