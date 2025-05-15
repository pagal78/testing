const {cmd , commands} = require('../command')
const fg = require('api-dylux')
const yts = require('yt-search')

cmd({
    pattern: "play6",
    desc: "To download songs.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*⫷⦁SHABAN-MD MUSⵊC DOWNLOADⵊNG⦁⫸*

🎵 *MUSⵊC FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎧 *ENJOY THE MUSIC BROUGHT TO YOU!*

> *SHABAN-MD WHATSAPP BOT* 

> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍʀ-sʜᴀʙᴀɴ* 
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download audio

let down = await fg.yta(url)
let downloadUrl = down.dl_url

//send audio message
await conn.sendMessage(from,{audio: {url:downloadUrl},mimetype:"audio/mpeg"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"audio/mpeg",fileName:data.title + ".mp3",caption:"*© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍʀ-sʜᴀʙᴀɴ*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`_Hi ${pushname} retry later_`)
}
})

//==============play6========================

cmd({
    pattern: "play5",
    desc: "Download songs via YouTube.",
    react: "🎵",
    category: "download",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, pushname, reply }) => {
    try {
        if (!q) return reply("❌ Please provide a song title or YouTube link!");

        const search = await yts(q);
        const song = search.videos[0];

        const caption = `
┌──⭓ *SHABAN-MD MUSIC*
│
├ 🎵 *Title:* ${song.title}
├ ⏱️ *Duration:* ${song.timestamp}
├ 👀 *Views:* ${song.views}
├ 📅 *Uploaded:* ${song.ago}
├ 🔗 *Link:* ${song.url}
│
└──⭓ *Enjoy your music!*
`;

        await conn.sendMessage(from, { image: { url: song.thumbnail }, caption }, { quoted: mek });

        const res = await fetch(`https://api.bwmxmd.online/api/download/ytmp3?apikey=ibraah-help&url=${encodeURIComponent(song.url)}`);
        const json = await res.json();

        if (!json.success) return reply("❌ Failed to download audio. Try again later.");

        const { download_url, title } = json.result;

        await conn.sendMessage(from, { audio: { url: download_url }, mimetype: "audio/mpeg" }, { quoted: mek });
        
        await conn.sendMessage(from, {
            document: { url: download_url },
            mimetype: "audio/mpeg",
            fileName: `${title}.mp3`,
            caption: "© Created by Mr-Shaban"
        }, { quoted: mek });

    } catch (error) {
        console.error(error);
        reply(`❌ Hi ${pushname}, something went wrong. Please try again later.`);
    }
});

//====================video_dl=======================

cmd({
    pattern: "darama5",
    alias: ["video5"],
    desc: "To download videos.",
    react: "🎥",
    category: "download",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply("Please give me a url or title")  
const search = await yts(q)
const data = search.videos[0];
const url = data.url
    
    
let desc = `
*⫷⦁SHABAN-MD VⵊDEO DOWNLOADⵊNG⦁⫸*

🎥 *VⵊDEO FOUND!* 

➥ *Title:* ${data.title} 
➥ *Duration:* ${data.timestamp} 
➥ *Views:* ${data.views} 
➥ *Uploaded On:* ${data.ago} 
➥ *Link:* ${data.url} 

🎬 *ENJOY THE VIDEO BROUGHT TO YOU!*

> *SHABAN-MD WHATSAPP BOT* 

> *© ᴄʀᴇᴀᴛᴇᴅ ʙʏ ᴍʀ-sʜᴀʙᴀɴ*
`

await conn.sendMessage(from,{image:{url: data.thumbnail},caption:desc},{quoted:mek});

//download video

let down = await fg.ytv(url)
let downloadUrl = down.dl_url

//send video message
await conn.sendMessage(from,{video: {url:downloadUrl},mimetype:"video/mp4"},{quoted:mek})
await conn.sendMessage(from,{document: {url:downloadUrl},mimetype:"video/mp4",fileName:data.title + ".mp4",caption:"*© SHABAN-MD*"},{quoted:mek})

}catch(e){
console.log(e)
  reply(`_Hi ${pushname} retry later_`)
}
})
//
