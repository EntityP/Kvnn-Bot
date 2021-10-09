const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")
const { RepeatMode } = require('discord-music-player');

module.exports = {
  name: "loop-queue",
  description: "loop the queue!",
  options: [
    {
      name: 'queue',
      description: 'queue commands',
      type: 'SUB_COMMAND',
    }
  ],

  run: async(client, interaction, args) => {
    const vc = interaction.member.voice.channel
    const subCommand = interaction.options.getSubcommand();

    if(subCommand === 'queue') {
      if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" });

      let guildQueue = client.player.getQueue(interaction.guild.id);
      guildQueue.setRepeatMode(RepeatMode.QUEUE);
  
      let embed = new MessageEmbed()
      .setTitle(`🎶Looping🎶`)
      .setDescription(`Looping The Queue`)
      .setColor("AQUA")
  
      await interaction.followUp({ embeds: [embed] })
    }
   
  }
}