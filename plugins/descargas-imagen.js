import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `*💡 Uso Correcto: ${usedPrefix + command} Bart Simpson*`, m);

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
    await m.react('💭');
                

    const res = await googleImage(text);
    const image = await res.getRandom();
    const link = image;

    const messages = [
        ['Imagen 1', dev, await res.getRandom(), [[]], [[]], [[]], [[]]],
        ['Imagen 2', dev, await res.getRandom(), [[]], [[]], [[]], [[]]],
        ['Imagen 3', dev, await res.getRandom(), [[]], [[]], [[]], [[]]],
        ['Imagen 4', dev, await res.getRandom(), [[]], [[]], [[]], [[]]]
    ];

    await conn.sendCarousel(m.chat, `⚡ Resultado de ${text}`, '🔎 Juanca ', null, messages, m);
    await m.react('✅');
};

handler.help = ['imagen <query>'];
handler.tags = ['buscador'];
handler.command = ['image', 'imagen', 'img'];
handler.group = true;
export default handler;
