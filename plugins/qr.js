const { cmd } = require('../command');
const qrcode = require('qrcode');

cmd({
    pattern: "qr ?(.*)",
    desc: "Convert text to QR Code",
    category: "tools",
    filename: __filename,
    react: "🔲",
    use: ".qr"
},
async (conn, mek, m, { args, reply, from }) => {
    try {
        const text = args.join(" ");
        if (!text) return reply("Please provide text to convert into QR code.");

        const qrBuffer = await qrcode.toBuffer(text, { type: 'png' });

        await conn.sendMessage(from, {
            image: qrBuffer,
            caption: `*QR Code for:* ${text}`
        }, { quoted: mek });
    } catch (err) {
        console.error("QR generation error:", err);
        reply("Failed to generate QR code.");
    }
});
