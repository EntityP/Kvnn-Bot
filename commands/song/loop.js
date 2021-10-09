const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js");
const { RepeatMode } = require('discord-music-player');

module.exports = {
  name: "loop",
  description: "loop a song!",
 

  run: async(client, message, args) => {

    const vc = message.member.voice.channel

      if(!message.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" });

      let guildQueue = client.player.getQueue(message.guild.id);
      guildQueue.setRepeatMode(RepeatMode.SONG);
  
      let embed = new MessageEmbed()
      .setTitle(`🎶Looping🎶`)
      .setDescription(`Now Looping The Song`)
      .setColor("AQUA")
  
      await message.reply({ embeds: [embed] });
  }
}