const Discord = require("discord.js");
const { readdirSync } = require("fs");
let folder = ["Developer", "General", "Music"];

module.exports = {
  name: "reload",
  aliases: ["rl"],
  category: "Developer",
  description: "sstt",
  run: async (client, message, args) => {
    var msg = message;
    if (msg.author.id !== "852954191626633248")
      return msg.channel.send(`Insufficient Permissions.`);

    readdirSync("./Bot/Commands/").forEach(async dir => {
      try {
        const commands = readdirSync(`./Bot/Commands/${dir}/`).filter(file =>
          file.endsWith(".js")
        );
        for (let file of commands) {
          let pull = require(`../../Commands/${dir}/${file}`);
          await client.commands.delete(pull.name, pull);
          await delete require.cache[require.resolve(`.././${dir}/${file}`)];
          if (pull.name) {
            await client.commands.set(pull.name, pull);
            if (pull.aliases && Array.isArray(pull.aliases))
              pull.aliases.forEach(alias =>
                client.aliases.set(alias, pull.name)
              );
          }
        }
      } catch (e) {
        console.log(e);
      }
    });
    let reload = new Discord.MessageEmbed()
      .setDescription(`Berhasil Memuat Ulang Semua Perintah ✅`)
      .setColor(client.color);
    message.channel.send({ embeds: [reload] });
  }
};
