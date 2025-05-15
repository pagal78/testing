const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "ping",
    alias: ["speed", "pong", "p"],
    use: '.ping',
    desc: "Check bot's response time with a VIP touch.",
    category: "main",
    react: "⚡",
    filename: __filename
},
async (conn, mek, m, { from, quoted, sender, reply }) => {
    try {
        const start = Date.now(); // Execution start time

        const reactionEmojis = ['🚛', '🚚', '🚜', '🚒', '🚐', '🛻', '🚗', '🚙', '🏎️', '🏍️'];
        const textEmojis = ['🚁', '🛸', '⚡️', '🚀', '🛩️', '🎠', '🚍', '🚔', '🚘', '🚖'];

        const reactionEmoji = reactionEmojis[Math.floor(Math.random() * reactionEmojis.length)];
        const filteredEmojis = textEmojis.filter(e => e !== reactionEmoji);
        const textEmoji = filteredEmojis[Math.floor(Math.random() * filteredEmojis.length)];

        // Send reaction
        await conn.sendMessage(from, {
            react: { text: textEmoji, key: m.key }
        });

        const responseTime = Date.now() - start; // Calculate response time

        // VIP style response
        const text = `*SHABAN-MD SERVER SPEED:* 🐦‍🔥  
🚀 *Response Time:* ${responseTime}ms ${reactionEmoji}  
👑 *Status:* Ultra-Fast 🦅`;

        await conn.sendMessage(from, {
            text,
            contextInfo: {
                mentionedJid: [sender]
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in ping command:", e);
        reply(`❌ *Error:* ${e.message}`);
    }
});