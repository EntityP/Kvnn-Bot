const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "stop",
  description: "stop a song!",
 

  run: async(client, interaction, args) => {
    const vc = message.member.voice.channel;

      if(!message.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" })


    let queue = client.player.createQueue(message.guild.id);
    queue.stop();

    let embed = new MessageEmbed()
    .setTitle(`🎶Stoping🎶`)
    .setDescription(`Now Stoping The Music`)
    .setColor(`AQUA`)
    message.reply({ embeds: [embed] });
  }
}