let fetch = require('node-fetch')
     let handler  = async (m, { conn, args }) => {
    heum = await require('node-fetch')('http://rikka-api.herokuapp.com/asupan/loli?apikey=rikkabotz').then(v => v.json())
   conn.sendMessage(m.chat,{ url: heum.result }, 'videoMessage', { quoted: m }) 
}
handler.help = ['lolivid', 'asupanloli']
handler.tags = ['wibu']
handler.command = /^lolivid|asupanloli$/i
handler.owner = false
handler.mods = false
handler.limit = true 
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler