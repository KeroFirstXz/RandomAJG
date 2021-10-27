const Discord = require('discord.js')
let UwaU = [
            'TERTIPU KAMU BANGSAT',
            'EA MAU NGINTIP'
           ];
const db = require("quick.db")
const snek = require('snekfetch')

module.exports = {
  name: "eval",
  aliases: ["e"],
  category: "Developer",
  description: "Eval Commands",
  usage: "[command]",
  run: async (client, message, args) => {
    if(message.author.id !== "852954191626633248" && message.user.author.id !== "486502585587466240") return message.channel.send(`${message.author}, Kamu Bukanlah Pemilik/Partner dari Bot **${client.user.username}**`)
    try {
      let codein = args.slice(0).join(' ');
      if(!codein) return message.channel.send(`❌ | ${message.author}, Silahkan Masukan Sebuah **Code**!`)
      let code = eval(codein);
      if (typeof code !== 'string')
        code = require('util').inspect(code, { depth: 0 });
      if(code.includes(process.env.TOKEN)) {
        code = code.replace(client.token, UwaU[Math.floor(Math.random() * UwaU.length)])
        if(code.includes(process.env.TOKEN)) {
          code = code.replace(client.token, UwaU[Math.floor(Math.random() * UwaU.length)])
        }
      }
      if(code.includes(process.env.PROJECT_DOMAIN)) {
        code = code.replace(process.env.PROJECT_DOMAIN, UwaU[Math.floor(Math.random() * UwaU.length)])
        if(code.includes(process.env.PROJECT_DOMAIN)) {
          code = code.replace(process.env.PROJECT_DOMAIN, UwaU[Math.floor(Math.random() * UwaU.length)])
        }
      }
      if(code.length < 1024) {
        if (codein.includes(`1 + 0`)) code = '10';
        let embed = new Discord.MessageEmbed()
        .setAuthor('Evaluasi')
        .setColor('BLUE')
        .addField('📥 Masuk', `\`\`\`js\n${codein}\`\`\``) 
        .addField('📤 Keluarnya', `\`\`\`js\n${code}\n\`\`\``)
        message.channel.send({ embeds: [embed] }).then(msg => msg.react('✅'))
      } else if(code.length > 1024) {
        snek.post("https://hastebin.com/documents").send(code).then(b => {
          message.channel.send(`Code => https://hastebin.com/${b.body.key}`)
        })
      }
    } catch (e) {
      message.channel.send(`\`\`\`js\n${e}\n\`\`\``).then(msg => msg.react('❌'))
    }
  }
}