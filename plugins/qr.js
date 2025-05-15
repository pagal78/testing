const { cmd } = require('../lib/command'); // Apni exact path check kar lo
const axios = require('axios');

cmd({
  pattern: "qr q",
  desc: "Convert text to QR Code via API",
  category: "tools",
  filename: __filename,
  react: "🔲"
}, async (conn, m, text) => {
  if (!text) return m.reply("Please provide text to convert into QR code.");

  try {
    const apiUrl = `https://pair888.onrender.com/qr?q=${encodeURIComponent(text)}`;
    const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    await conn.sendMessage(m.chat, {
      image: buffer,
      caption: `*QR Code for:* ${text}`
    }, { quoted: m });
  } catch (err) {
    console.error("QR generation error:", err);
    m.reply("Failed to generate QR code.");
  }
});
