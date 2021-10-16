let handler = async (m, { conn, participants, groupMetadata }) => {
    let pp = './src/avatar_contact.png'
     let i = 1
    try {
        pp = await conn.getProfilePicture(m.chat)
    } catch (e) {
    } finally {
        let { nsfw, antinsfw, isBanned, welcome, detect, sWelcome, sBye, sPromote, sDemote, antiLink } = global.DATABASE.data.chats[m.chat];
        const groupAdmins = await conn.getAdmins(m.chat)
        let listAdmin = groupAdmins.map(v => `${i + 1}. @${v.jid.split('@')[0]}`).join('\n')
        let text = `*「 Group Information 」*\n
*ID:* 
${groupMetadata.id}

*Name:* 
${groupMetadata.subject}

*Description:* 
${groupMetadata.desc}

*Total Members:*
${participants.length} Members

*Group Owner:* 
@${m.chat.split`-`[0]}

*Group Admins:*
${listAdmin}

*Group Settings:*
${isBanned ? '✅' : '❌'} Banned
${welcome ? '✅' : '❌'} Welcome
${detect ? '✅' : '❌'} Detect
${global.DATABASE.data.chats[m.chat].delete ? '❌' : '✅'} Anti Delete
${antiLink ? '✅' : '❌'} Anti Link
${antinsfw ? '✅' : '❌'} Anti NSFW
${nsfw ? '✅' : '❌'} NSFW

*Message Settings:*
Welcome: ${sWelcome}
Bye: ${sBye}
Promote: ${sPromote}
Demote: ${sDemote}
`.trim()
        ownernya = [`${m.chat.split`-`[0]}@s.whatsapp.net`]
        let mentionedJid = groupAdmins.concat(ownernya)
        conn.sendMessage(m.chat, { url: pp }, 'imageMessage', { caption: text, quoted: m, contextInfo: { mentionedJid }})
    }
}
handler.help = ['infogrup']
handler.tags = ['group']
handler.command = /^(gro?upinfo|info(gro?up|gc))$/i

handler.group = true

module.exports = handler