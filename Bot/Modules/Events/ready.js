const Discord = require("discord.js");
const moment = require("moment");
const fs = require("fs");
let folder = ["Developer", "Music", "General"];

module.exports = client => {
  try {
    console.log("Ready");
    folder.forEach(function(a) {
      fs.readdir(`./Bot/Commands/${a}`, async (err, files) => {
        console.log(
          `【 Perintah 】 Berhasil Menemukan : ${files.length} Perintah Pada Kategory : ${a}`
        );
        if (err) return null;
      });
    });

    let Status = [`Jadi bot itu sulit kawan`, `di suruh terus saya ;-;`];

    setInterval(async () => {
      const random = Math.floor(Math.random() * Status.length);
      try {
        await client.user.setPresence({
          activities: [{
            name: `${Status[random]}`,
            type: "STREAMING",
            url: "https://www.twitch.tv/gbot"
          }],
          status: "idle"
        });
      } catch (error) {
        console.error(error);
      }
    }, 20000);
  } catch (e) {
    console.log(e);
  }
};
