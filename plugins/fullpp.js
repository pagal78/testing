const { cmd } = require('../command');
const Jimp = require('jimp');

cmd({
  pattern: "fullpp",
  react: "🖼️",
  desc: "Set full image as bot's profile picture (no crop)",
  category: "tools",
  filename: __filename
}, async (conn, mek, m) => {
  try {
    const isQuotedImage = m.quoted && (m.quoted.type === 'imageMessage' || (m.quoted.type === 'viewOnceMessage' && m.quoted.msg.type === 'imageMessage'));
    if (!isQuotedImage) {
      return m.reply('⚠️ *Reply kisi image par karein...*');
    }

    m.reply('⏳ *Setting full-size profile picture...*');

    const imgBuffer = await m.quoted.download();
    const img = await Jimp.read(imgBuffer);
    const width = img.bitmap.width;
    const height = img.bitmap.height;

    const size = Math.max(width, height); // square base
    const bg = new Jimp(size, size, 0x000000FF); // black background

    const x = (size - width) / 2;
    const y = (size - height) / 2;
    bg.composite(img, x, y); // center the original image

    const finalBuffer = await bg.getBufferAsync(Jimp.MIME_JPEG);
    await conn.updateProfilePicture(conn.user.id, finalBuffer);

    m.reply('✅ *Full image DP successfully set!*');
  } catch (err) {
    console.error(err);
    m.reply(`❌ *Error:* ${err.message}`);
  }
});
