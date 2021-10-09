const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js");
const { RepeatMode } = require('discord-music-player');

module.exports = {
  name: "loop",
  description: "loop a song!",
  options: [
    {
      name: 'song',
      description: 'Song commands',
      type: 'SUB_COMMAND',
    }
  ],

  run: async(client, interaction, args) => {
    const vc = interaction.member.voice.channel

    const subCmd = interaction.options.getSubcommand()
    if(subCmd === 'song') {
      if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" });

      let guildQueue = client.player.getQueue(interaction.guild.id);
      guildQueue.setRepeatMode(RepeatMode.SONG);
  
      let embed = new MessageEmbed()
      .setTitle(`🎶Looping🎶`)
      .setDescription(`Now Looping The Song`)
      .setColor("AQUA")
  
      await interaction.followUp({ embeds: [embed] })
    }
 
  }
}