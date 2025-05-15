const path = require("path");
const { fetchGif, fetchImage, gifToSticker } = require('../lib/sticker-utils');
const { tmpdir } = require("os");
const fetch = require("node-fetch");
const Crypto = require("crypto");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson } = require("../lib/functions");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const { cmd } = require('../command');
const { videoToWebp } = require('../lib/video-utils');
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
const config = require("../config");

cmd(
  {
    pattern: 'gif',
    alias: ['gsticker', 'g2s', 'gs', 'v2s', 'vs',],
    desc: 'Convert GIF/Video to a sticker.',
    category: 'sticker',
    use: '<reply media or URL>',
    filename: __filename,
  },
  async (conn, mek, m, { quoted, args, reply }) => {
    try {
      if (!mek.quoted) return reply('*Reply to a video or GIF to convert it to a sticker!*');

      const mime = mek.quoted.mtype;
      if (!['videoMessage', 'imageMessage'].includes(mime)) {
        return reply('*Please reply to a valid video or GIF.*');
      }

      // Download the media file
      const media = await mek.quoted.download();

      // Convert the video to a WebP buffer
      const webpBuffer = await videoToWebp(media);

      // Generate sticker metadata
      const sticker = new Sticker(webpBuffer, {
        pack: config.STICKER_NAME || 'My Pack',
        author: '', // Leave blank or customize
        type: StickerTypes.FULL, // FULL for regular stickers
        categories: ['🤩', '🎉'], // Emoji categories
        id: '12345', // Optional ID
        quality: 75, // Set quality for optimization
        background: 'transparent', // Transparent background
      });

      // Convert sticker to buffer and send
      const stickerBuffer = await sticker.toBuffer();
      return conn.sendMessage(mek.chat, { sticker: stickerBuffer }, { quoted: mek });
    } catch (error) {
      console.error(error);
      reply(`❌ An error occurred: ${error.message}`);
    }
  }
);    


const stylishText = (text) => {
    return text
        .replace(/a/g, '𝗔').replace(/b/g, '𝗕').replace(/c/g, '𝗖')
        .replace(/d/g, '𝗗').replace(/e/g, '𝗘').replace(/f/g, '𝗙')
        .replace(/g/g, '𝗚').replace(/h/g, '𝗛').replace(/i/g, '𝗜')
        .replace(/j/g, '𝗝').replace(/k/g, '𝗞').replace(/l/g, '𝗟')
        .replace(/m/g, '𝗠').replace(/n/g, '𝗡').replace(/o/g, '𝗢')
        .replace(/p/g, '𝗣').replace(/q/g, '𝗤').replace(/r/g, '𝗥')
        .replace(/s/g, '𝗦').replace(/t/g, '𝗧').replace(/u/g, '𝗨')
        .replace(/v/g, '𝗩').replace(/w/g, '𝗪').replace(/x/g, '𝗫')
        .replace(/y/g, '𝗬').replace(/z/g, '𝗭')
        .replace(/A/g, '𝗔').replace(/B/g, '𝗕').replace(/C/g, '𝗖')
        .replace(/D/g, '𝗗').replace(/E/g, '𝗘').replace(/F/g, '𝗙')
        .replace(/G/g, '𝗚').replace(/H/g, '𝗛').replace(/I/g, '𝗜')
        .replace(/J/g, '𝗝').replace(/K/g, '𝗞').replace(/L/g, '𝗟')
        .replace(/M/g, '𝗠').replace(/N/g, '𝗡').replace(/O/g, '𝗢')
        .replace(/P/g, '𝗣').replace(/Q/g, '𝗤').replace(/R/g, '𝗥')
        .replace(/S/g, '𝗦').replace(/T/g, '𝗧').replace(/U/g, '𝗨')
        .replace(/V/g, '𝗩').replace(/W/g, '𝗪').replace(/X/g, '𝗫')
        .replace(/Y/g, '𝗬').replace(/Z/g, '𝗭');
};

cmd({
    pattern: "attp",
    desc: "Convert text to a GIF sticker.",
    react: "🪀",
    category: "convert",
    use: ".attp HI",
    filename: __filename,
}, async (conn, mek, m, { args, reply }) => {
    try {
        if (!args.length) return reply("*Please provide text!*");

        const text = args.join(" ");
        const styledText = stylishText(text);

        // API call with proper URL encoding
        const gifBuffer = await fetchGif(`https://api.nexoracle.com/image-creating/attp?apikey=2f9b02060a600d6c88&text=${encodeURIComponent(styledText)}`);
        const stickerBuffer = await gifToSticker(gifBuffer);

        await conn.sendMessage(m.chat, { sticker: stickerBuffer }, { quoted: mek });
    } catch (error) {
        reply(`❌ ${error.message}`);
    }
});