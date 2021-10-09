const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "progressbar",
  description: "shows you how far in the song is",
  options: [
    {
      name: 'queue',
      description: 'queue commands',
      type: 'SUB_COMMAND',
    }
  ],
  run: async(client, interaction, args) => {
    const vc = interaction.member.voice.channel

    const SubCommand = interaction.options.getSubcommand();

    if(SubCommand === 'queue') {
      if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" });

      let guildQueue = client.player.getQueue(interaction.guild.id);
      const ProgressBar = guildQueue.createProgressBar();
      let embed = new MessageEmbed()
      .setTitle(`🎶ProgressBar🎶`)
      .setDescription(`${ProgressBar}`)
      .setColor("AQUA")
  
      await interaction.followUp({ embeds: [embed] })
    }
   
  }
}