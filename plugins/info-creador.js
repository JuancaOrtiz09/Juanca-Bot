let handler = async (m, { conn, usedPrefix, isOwner }) => {
    let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;JuancaOrtiz;;\nFN:JuancaOrtiz\nTITLE:\nitem1.TEL;waid=573163963499:573163963499\nitem1.X-ABLabel:JuancaOrtiz\nitem2.URL:https://wa.me/573163963499\nitem2.X-ABLabel:Enviar Mensaje\nEND:VCARD`;
    await conn.sendMessage(m.chat, { contacts: { displayName: 'Juanca⁩', contacts: [{ vcard }] }}, { quoted: m });
}

handler.help = ['owner'];
handler.tags = ['main'];
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;
