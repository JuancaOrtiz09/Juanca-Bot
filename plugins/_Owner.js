const handler = async (m, { conn }) => {
  if (!m.isGroup || !m.message) return

  const key = Object.keys(m.message)[0]
  const content = m.message[key]
  const mentioned = content?.contextInfo?.mentionedJid || []

  const ownerJids = global.owner.map(o => o[0] + '@s.whatsapp.net')
  const mencionAlOwner = mentioned.some(jid => ownerJids.includes(jid))

  if (mencionAlOwner) {
    await conn.reply(m.chat, 'Por favor, no etiquetes al owner si no es necesario.', m)
    console.log('[antiOwnerTag] Mención al owner detectada:', mentioned)
  }
}

export default handler

handler.all = true
handler.group = true
