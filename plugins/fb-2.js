const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "fb2",
    alias: ["facebook2"],
    desc: "Download Facebook videos (HD only)",
    category: "downloader",
    react: "📺",
    filename: __filename
},
async (conn, mek, m, { from, args, q, reply }) => {
    try {
        if (!q) return reply("Please provide a Facebook video link.");
        if (!q.includes("facebook.com")) return reply("Invalid Facebook link.");

        reply("Downloading HD video, please wait...");

        const apiUrl = `https://apis.davidcyriltech.my.id/facebook2?url=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data.status || !data.video || !data.video.downloads) {
            return reply("❌ Failed to fetch Facebook video. Try another link.");
        }

        const { title, thumbnail, downloads } = data.video;
        const hdVideo = downloads.find(d => d.quality === "HD");

        if (!hdVideo?.downloadUrl) return reply("❌ HD video not available.");

        const caption = `🎬 *Facebook Video Downloader*\n\n📖 *SHABAN-MD*`;

        await conn.sendMessage(from, {
            video: { url: hdVideo.downloadUrl },
            caption: caption,
            contextInfo: { mentionedJid: [m.sender] }
        }, { quoted: mek });

    } catch (e) {
        console.error("Facebook downloader error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});