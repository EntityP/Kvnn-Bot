const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js");
const { RepeatMode } = require('discord-music-player');

module.exports = {
  name: "remove-loop",
  description: "remove a loop from a song!",
  options: [
    {
      name: 'song',
      description: 'Song commands',
      type: 'SUB_COMMAND',
    }
  ],
  run: async(client, interaction, args) => {
    const vc = interaction.member.voice.channel
    const subCommand = interaction.options.getSubcommand();
    if(subCommand === 'song') {
      if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" });

      let guildQueue = client.player.getQueue(interaction.guild.id);
      guildQueue.setRepeatMode(RepeatMode.DISABLED);
      let embed = new MessageEmbed()
      .setTitle(`🎶Removing Loop🎶`)
      .setDescription(`Loop Ending`)
      .setColor("AQUA")
  
      await interaction.followUp({ embeds: [embed] })
    }
    }
}