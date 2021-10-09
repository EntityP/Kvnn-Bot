const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")
const { RepeatMode } = require('discord-music-player');

module.exports = {
  name: "loop-queue",
  description: "loop the queue!",

  run: async(client, message, args) => {
    const i = message.reply;

    const vc = message.member.voice.channel

      if(!message.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" });

      let guildQueue = client.player.getQueue(message.guild.id);
      guildQueue.setRepeatMode(RepeatMode.QUEUE);
  
      let embed = new MessageEmbed()
      .setTitle(`🎶Looping🎶`)
      .setDescription(`Looping The Queue`)
      .setColor("AQUA")
  
      await message.reply({ embeds: [embed] })
  }
}