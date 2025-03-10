const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply('🚩 *¡YA ME LA CHUPASTE CON EXITO!*',m, rcanal);
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
  await m.react(done)
   m.reply('🚩 *¡YA ME LA CHUPASTE CON EXITO!*', m, rcanal);
    let nn = conn.getName(m.sender);
     conn.reply('573163963499@s.whatsapp.net', `🚩 *${nn}* se dio Auto Admin en:\n> ${groupMetadata.subject}.`, m, rcanal, );
  } catch {
    m.reply('🚩 Ocurrio un error.');
  }
};
handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
export default handler;
