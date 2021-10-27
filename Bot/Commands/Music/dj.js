let Discord = require("discord.js")

module.exports = {
  name: "dj",
  aliases: [],
  category: "Music",
  description: "Test",
  run: async (client, msg, args, p) => {
    let optraw = args.slice().join(' ')
    let opt = optraw.toLocaleLowerCase()
    if (!optraw) {
      let helpembed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setAuthor('DJ Help Commands', client.user.displayAvatarURL())
      .setDescription(`__**Commands List**__
  **${p}DJ adduser** - __**For adding user to DJ list**__
  **${p}DJ removeuser** - __**For removing user from DJ list**__
  **${p}DJ list** - __**For see list of DJ**__
      
__**Examples**__
  **${p}DJ adduser <@${msg.author.id}>**
  **${p}DJ removeuser <@${msg.author.id}>**`)
      
      msg.channel.send({ embeds: [helpembed] })
    }
    if(opt.match('adduser')) {
      let users = msg.mentions.users.first()
      if (!users) return msg.channel.send("Please mention a user to give DJ Permissions to them.")
      client.dj.push(`${msg.guild.id}.list`, { idser: users.id })
      msg.channel.send(`DJ | Added new Users <@!${users.id}>`)
    }
    
    if(opt.match('userlist')) {
      let index = 0
      let listed = client.dj.fetch(`${msg.guild.id}.list`)
      if(listed === undefined || listed === null || listed === undefined || !listed) return msg.channel.send("Kaga ada isinya Pe'a")
      let isi = listed.map(x => `**${index++} |** <@!${x.idser}> [${x.idser}]`).join('\n')
      let embeded = new Discord.MessageEmbed()
      .setAuthor('| DJ User List', msg.guild.iconURL())
      .setDescription(`${isi}`)
      msg.channel.send({ embeds: [embeded] })
    }
    
    if(opt.match('remuser') || opt.match('removeuser')) {
      let num = args.slice(1).join(' ')
      if(!num || isNaN(num)) return msg.channel.send(`${msg.author}, Please input number from DJ List!
\`${p}dj userlist\``)
      let data = await client.dj.fetch(`${msg.guild.id}.list`)
      let no_data = data.length - 1
      if(num > no_data) return msg.channel.send(`${msg.author}, Didn't found number \`${num}\`! Please check
\`${p}dj userlist\``)
      let spliced = data.splice(num, 1)[0].idser
      let data2 = await client.dj.fetch(`${msg.guild.id}.list`)
      let finder = data2.find( ({ idser }) => idser === spliced)
      let data3 = await client.dj.fetch(`${msg.guild.id}.list`)
      let filtered = data3.filter(function(x) {
        return x.idser !== finder.idser
      })
      if(data3.map(x => finder === x)) {
        await client.dj.set(`${msg.guild.id}.list`, filtered)
        return msg.channel.send(`${msg.author}, Successfully deleted \`${num}\``)
      }
    }
  }
};
