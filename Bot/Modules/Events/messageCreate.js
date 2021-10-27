const Discord = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot) return null;
  if (!message.guild) return null;
  let prefix = client.config.app.prefix;
  message.prefix = prefix;
  if (
    message.content == `<@${client.user.id}>` ||
    message.content == `<@!${client.user.id}>`
  ) {
    let tembedid = new Discord.MessageEmbed()
      .setDescription(
        `Halo! ${message.member}, Namaku Adalah <@${client.user.id}>\nUntuk Info Lebih Lanjut Ketik **${prefix}help**`
      )
      .setFooter(client.user.tag)
      .setTimestamp()
      .setColor("BLUE");
    message.channel.send({ embeds: [tembedid] });
  }
  if (!message.content.startsWith(prefix)) return;
  if (!message.member)
    message.member = await message.guild.fetchMember(message);
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length === 0) {
    message.channel.send(
      `Maaf <@${message.author.id}>, command ${cmd} tidak ada/sedang tidak tersedia.`
    );
  }
  let command = client.commands.get(cmd);
  // let DJ = client.dj.get('dj')
  
  if (!command) command = client.commands.get(client.aliases.get(cmd));
//   if (command && DJ.enabled && DJ.commands.includes(command.name)) {
//         const roleDJ = message.guild.roles.cache.find(x => x.name === DJ.roleName);

//         if (!message.member._roles.includes(roleDJ.id)) {
//             return message.channel.send(`This command is reserved for members with the ${DJ.roleName} role on the server ${message.author}... try again ? ❌`);
//         }
//     }

//     if (command && command.voiceChannel) {
//         if (!message.member.voice.channel) return message.channel.send(`You're not in a voice channel ${message.author}... try again ? ❌`);

//         if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(`You are not in the same voice channel ${message.author}... try again ? ❌`);
//     }
  try {
    if (command) command.run(client, message, args, prefix);
  } catch (e) {
    console.log(e);
  } finally {
    console.log(`${message.author.username} Menggunakan Command: ${cmd}`);
  }
};
