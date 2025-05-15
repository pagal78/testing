const axios = require("axios");
const config = require('../config');
const { cmd } = require('../command');

cmd({
  pattern: "sss",
  alias: ["screenweb"],
  react: "💫",
  desc: "Download screenshot of a given link.",
  category: "other",
  use: ".ss <link>",
  filename: __filename,
}, 
async (conn, mek, m, { from, q, reply }) => {
  if (!q) {
    return reply("❗ براہ کرم اسکرین شاٹ لینے کے لیے ایک لنک فراہم کریں۔");
  }

  try {
    const screenshotUrl = `https://bk9.fun/tools/screenshot?url=${encodeURIComponent(q)}`;
    
    // Testing API response
    const response = await axios.get(screenshotUrl, { responseType: 'arraybuffer' });

    if (!response || response.status !== 200) {
      return reply("⚠️ اسکرین شاٹ لینے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔");
    }

    const imageBuffer = Buffer.from(response.data, 'binary');

    await conn.sendMessage(from, { 
      image: imageBuffer, 
      caption: "*📸 WEB SCREENSHOT DOWNLOADER*\n\n> *© Powered By Shaban Md*" 
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("⚠️ اسکرین شاٹ لینے میں ناکامی۔ براہ کرم دوبارہ کوشش کریں۔");
  }
});