const { cmd } = require('../lib/command'); // Apni exact path check kar lo
const qrcode = require('qrcode');

cmd({
  pattern: "qr",
  desc: "Convert text to QR Code",
  category: "tools",
  filename: __filename,
}, async (conn, m, text) => {
  if (!text) return m.reply("Please provide text to convert into QR code.");

  try {
    const qrBuffer = await qrcode.toBuffer(text, { type: 'png' });
    await conn.sendMessage(m.chat, {
      image: qrBuffer,
      caption: `*QR Code for:* ${text}`
    }, { quoted: m });
  } catch (err) {
    console.error("QR generation error:", err);
    m.reply("Failed to generate QR code.");
  }
});
