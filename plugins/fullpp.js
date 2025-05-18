const { cmd } = require('../command');
const Jimp = require('jimp');

cmd({
    pattern: "fullpp",
    react: "🖼️",
    desc: "Set full image as bot's profile picture",
    category: "tools",
    filename: __filename
},
async (conn, mek, m) => {
    try {
        const quoted = m.quoted;

        if (!quoted || !quoted.mtype || !quoted.mtype.includes('image')) {
            return m.reply('⚠️ *Kisi image par reply karein.*');
        }

        m.reply('⏳ *Image process ho rahi hai, please wait...*');

        const media = await conn.downloadMediaMessage(quoted);
        const image = await Jimp.read(media);

        const size = 640; // Required size
        image.cover(size, size); // Crop to fit (without borders or blur)

        const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

        await conn.updateProfilePicture(conn.user.id, buffer);

        m.reply('✅ *Bot ki profile picture full image ke sath set kar di gayi!*');
    } catch (err) {
        console.error(err);
        m.reply(`❌ *Error:* ${err.message}`);
    }
});
