const { cmd } = require('../command');
const axios = require('axios');

cmd({
  pattern: "likee",
  alias: ["lkdl", "likee-dl"],
  desc: "To download Capcut templates.",
  react: "🎥",
  category: "download",
  filename: __filename
}, async (conn, m, store, { from, q, reply }) => {
  try {
    if (!q || !q.startsWith("http")) {
      return reply("❌ Please provide a valid Likee link.");
    }

    await conn.sendMessage(from, {
      react: { text: "⏳", key: m.key }
    });

    // Modified API call with new endpoint
    const response = await axios.get(`https://bk9.fun/download/likee?url=${encodeURIComponent(q)}`);
    const data = response.data;

    if (!data || data.status !== true || !data.BK9) {
      return reply("⚠️ Failed to fetch likee content. Please check the link and try again.");
    }

    // Constructing the video download URL based on the API response
    const videoUrl = data.BK9.withoutwatermark; // or `withWatermark` if needed

    // Sending the video
    await conn.sendMessage(from, {
      video: { url: videoUrl },
      mimetype: "video/mp4",
      caption: `📥 *Likee Downloaded SHABAN-MD*\n
      🎥 *Title:* ${data.BK9.title}\n
      📏 *Size:* Not available`
    }, { quoted: m });

  } catch (error) {
    console.error("Error:", error);
    reply("❌ An error occurred while processing your request. Please try again.");
  }
});