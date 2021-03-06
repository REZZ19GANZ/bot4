const { toAudio } = require('../lib/converter')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, usedPrefix, command }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (m.quoted ? m.quoted : m.msg).mimetype || ''
  if (!/video|audio/.test(mime)) throw `Balas video atau voice note yang ingin diubah ke mp3 dengan caption *${usedPrefix + command}*`
  let media = await q.download()
conn.updatePresence(m.chat, 'recording')
  let audio = await toAudio(media, 'mp3')
  conn.sendMessage(m.chat, audio, MessageType.audio, {
    quoted: m,
   mimetype: 'audio/mpeg'
  })
}
handler.help = ['tomp3']
handler.tags = ['audio']

handler.command = /^to(mp3|a(udio)?)$/i

module.exports = handler