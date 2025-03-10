import fs from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'

const API_TOKEN = '98d28df9afa2842b8d556a5abb6adea7' // Tu API Key de Audd.io

let handler = async (m, { conn }) => {
    try {
        let q = m.quoted ? m.quoted : m
        let mime = (q.msg || q).mimetype || ''

        if (/audio|video/.test(mime)) {
            if ((q.msg || q).seconds > 20) {
                return m.reply('⚠️ El archivo es demasiado grande. Envíe un clip de 10 a 20 segundos para obtener resultados.')
            }

            await conn.reply(m.chat, '⏳ Procesando el audio/video, por favor espera...', m)

            let media = await q.download()
            let filePath = `./tmp/${m.sender}.mp3`
            fs.writeFileSync(filePath, media)

            let form = new FormData()
            form.append('api_token', API_TOKEN)
            form.append('return', 'apple_music,spotify')
            form.append('file', fs.createReadStream(filePath), { filename: 'audio.mp3' })

            let res = await fetch('https://api.audd.io/', {
                method: 'POST',
                body: form,
                headers: form.getHeaders()
            })

            fs.unlinkSync(filePath) // Eliminar el archivo temporal

            let json = await res.json()
            if (json.status !== 'success') {
                return m.reply(`❌ Error: ${json.error?.error_message || 'No se pudo identificar la canción.'}`)
            }

            let { title, artist, album, release_date, song_link } = json.result
            let txt = `
🎵 *Resultado encontrado:*
📌 *Nombre:* ${title}
🎤 *Artista:* ${artist}
💽 *Álbum:* ${album || 'Desconocido'}
📅 *Lanzamiento:* ${release_date || 'Desconocida'}
🔗 *Enlace:* ${song_link || 'No disponible'}
     
 > Provided by *JuancaBot*    
            
            `.trim()

            m.reply(txt)
        } else {
            m.reply('⚠️ Responde a un audio o video para identificar la canción.')
        }
    } catch (e) {
        m.reply(`⚠️ Error inesperado: ${e.message}`)
    }
}

handler.tags = ['tools']
handler.help = ['whatm2']
handler.command = ['whatm2']
handler.group = true

export default handler
