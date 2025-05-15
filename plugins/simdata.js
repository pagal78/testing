const { cmd, commands } = require('../command');
const axios = require('axios');

cmd({
    pattern: "sim",
    alias: ["cnic", "siminfo"],
    desc: "Get SIM owner details (Owner only)",
    category: "owner",
    react: "🧾",
    filename: __filename,
    owner: true // Only owner can use
},
async (conn, mek, m, { from, body, args, isOwner, isMe, reply }) => {
    try {
        if (!isOwner && !isMe) return reply('❌ Only owner or bot itself can use this command.');

        const number = args[0];
        if (!number) return reply('⚠️ Please provide a number.\n\nExample: *.sim 3××××××××××÷*');

        const apiUrl = `https://fam-official.serv00.net/sim/api.php?num=${number}`;
        const { data } = await axios.get(apiUrl);

        if (data.status !== "success" || !data.data || !data.data.length) {
            return reply('❌ No data found for this number.');
        }

        const info = data.data[0];

        // Checking if the response is "Data Not Found"
        let name = info.Name;
        let mobile = info.Mobile;
        let cnic = info.CNIC;
        let operator = info.Operator;
        let address = info.Address;

        if (name.includes('Not Found') || mobile.includes('Not Found') || cnic.includes('Not Found') || operator.includes('not available')) {
            // Replace specific texts
            operator = `⚠️ This number is not available in our database!🎉 Join our WhatsApp channel for FREE premium SIM data!🔗 https://whatsapp.com/channel/0029VbAILzC4CrfjeUn3Ry1N`;
            address = `📞 For paid SIM data, contact @Sarkar-Bandaheali`;

            name = '❌ Data Not Found';
            mobile = '❌ Data Not Found';
            cnic = '❌ Data Not Found';
        }

        const result = `╭───❰ 𝑺𝑯𝑨𝑩𝑨𝑵-𝑴𝑫 ❱───➤
┃ 🧑‍💻 𝗡𝗮𝗺𝗲: *${name}*
┃ 📞 𝗠𝗼𝗯𝗶𝗹𝗲: *${mobile}*
┃ 🆔 𝗖𝗡𝗜𝗖: *${cnic}*
┃ 🛰️ 𝗢𝗽𝗲𝗿𝗮𝘁𝗼𝗿: *${operator}*
┃ 🏡 𝗔𝗱𝗱𝗿𝗲𝘀𝘀: *${address}*
╰─────────────────➤`;

        await reply(result);

    } catch (e) {
        console.error("Error in sim command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});