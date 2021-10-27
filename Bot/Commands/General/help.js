const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags");
const db = require("quick.db")
const moment = require("moment")

module.exports = {
    name: "help",
    aliases: ["h"],
    category: "info",
    description: "Returns all commands, or one specific command info",
    usage: "[command | alias]",
    run: async (client, message, args, prefix) => {
        if (args[0]) {
            return getCMD(client, message, args[0]);
        } else {
            return getAll(client, message);
        }
    }
}

async function getAll(client, message) {
  
  let icon = message.guild.iconURL({ dycnamic : true })
  
  if (!icon) {
   icon = 'https://media.discordapp.net/attachments/491205538177351701/871891600958173214/0KZ2YmnMd-8UYReKL.png?width=1253&height=705';
  }
  
  let p = client.config.app.prefix;
  
    const embed = new MessageEmbed()
        .setTitle(`${client.user.username} Help Commands.`)
        .setColor("#29bfff")
        .setImage("https://www.gambaranimasi.org/data/media/562/animasi-bergerak-garis-0170.gif")
        .setThumbnail(icon)
        .setFooter(`Use ${p}help <commands name> for help commands!, Use ${p}Bugreport <reason> to report bugs that are needed in the fix`)
        .setTimestamp()
    
    // Map all the commands
    // with the specific category
    const cmds = (category) => {
        return client.commands
            .filter(cmd => cmd.category === category)
            .map(cmd => ` \`${cmd.name}\``)
            .join("");
    }

    // Map all the categories
    const info = client.category
        .map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n${cmds(cat)}`)
        .reduce((string, category) => string + "\n" + category);

    return message.channel.send({ embeds: [embed.setDescription(info)] });
}

function getCMD(client, message, input) {
    const embed = new MessageEmbed()

    // Get the cmd by the name or alias
    const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));
    
    let info = `No information found for command **${input.toLowerCase()}**`;

    // If no cmd is found, send not found embed
    if (!cmd) {
        return message.channel.send({ embeds: [embed.setColor("#29bfff").setDescription(info)] });
    }

    // Add all cmd info to the embed
    if (cmd.name) info = `**Command name**: ${cmd.name}`;
    if (cmd.aliases) info += `\n**Aliases**: ${cmd.aliases.map(a => `\`${a}\``).join(", ")}`;
    if (cmd.description) info += `\n**Description**: ${cmd.description}`;
    if (cmd.usage) {
        info += `\n**Usage**: ${cmd.usage}`;
        embed.setFooter(`Syntax: <> = required, [] = optional`);
    }

    return message.channel.send({ embeds: [embed.setColor("#29bfff").setDescription(info)] });
}