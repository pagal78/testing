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
        
        // Fetch image as buffer
        const response = await axios.get(qrUrl, { responseType: 'arraybuffer' });

        if (!response.data) {
            return await reply("❌ QR code image not found. Try again later.");
        }

        // Send QR image
        await conn.sendMessage(from, {
            image: Buffer.from(response.data),
            caption: "*Here is your SHABAN-MD QR Code*\nScan this in your second device WhatsApp to link your bot."
        }, { quoted: mek });

    } catch (error) {
        console.error("QR command error:", error);
        await reply("❌ Failed to get QR code. Please try again later.");
    }
});