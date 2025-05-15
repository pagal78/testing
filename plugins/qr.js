const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
    pattern: "qr",
    alias: ["getqr", "cloneqr"],
    react: "📷",
    desc: "Get QR code for SHABAN-MD bot",
    category: "utility",
    use: ".qr",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const qrUrl = "https://pair999-0046b52d6ac2.herokuapp.com/qr";

        const response = await axios.get(qrUrl, {
            responseType: 'arraybuffer',
            timeout: 10000 // 10 seconds timeout
        });

        if (response.status !== 200 || !response.data) {
            return await reply("❌ QR code not available at the moment. Try again later.");
        }

        await conn.sendMessage(from, {
            image: Buffer.from(response.data),
            caption: "*Here is your SHABAN-MD QR Code*\nScan this with WhatsApp on your second device to log in.",
            fileName: "shaban-md-qr.jpg"
        }, { quoted: mek });

    } catch (error) {
        console.error("QR command error:", error.message);
        await reply("❌ Failed to fetch QR code. Check the server or try again shortly.");
    }
});
