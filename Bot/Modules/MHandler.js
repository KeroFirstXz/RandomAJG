const Discord = require('discord.js');

module.exports = client => {
  client.player.on("error", (queue, error) => {
    console.log(`Error emitted from the queue ${error.message}`);
  });

  client.player.on("connectionError", (queue, error) => {
    console.log(`Error emitted from the connection ${error.message}`);
  });

  client.player.on("trackStart", (queue, track) => {
    let squeue = client.player.getQueue(queue.mes.guild.id);
    if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;
    queue.metadata.send(
      `**Playing** 🎶 \`${track.title}\` - Now!, Volume: \`${squeue.volume}%\``
    );
  });

  client.player.on("trackAdd", (queue, track) => {
    var queueembed = new Discord.MessageEmbed()
      .setAuthor(`Added to queue`, queue.mes.author.avatarURL)
      .setThumbnail(`https://i.ytimg.com/vi/${track.id}/default.jpg?width=80&height=60`)
      .setDescription(`**[${track.title}](${track.url})**`)
      .addField("Song Duration", `${track.duration}`, true)
    queue.metadata.send({ embeds: [queueembed] });
  });

  client.player.on("botDisconnect", queue => {
    queue.metadata.send(
      "I was manually disconnected from the voice channel, clearing queue... ❌"
    );
  });

  client.player.on("channelEmpty", queue => {
    queue.metadata.send(
      "Nobody is in the voice channel, leaving the voice channel... ❌"
    );
  });

  client.player.on("queueEnd", queue => {
    queue.metadata.send("I finished reading the whole queue ✅");
  });
};
