
const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "pause",
  description: "pause a song",
  options: [
    {
      name: 'music',
      description: 'play some music',
      type: 'SUB_COMMAND',
    }
  ],

  run: async(client, interaction, args) => {

    const subCommand = interaction.options.getSubcommand();
    if(subCommand === 'music') {
      const vc = interaction.member.voice.channel

      if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" });
  
      let guildQueue = client.player.getQueue(interaction.guild.id);
      guildQueue.setPaused(true);
  
      //  let guildQueue = client.player.getQueue(interaction.guild.id)
      // .then(await guildQueue.setPaused(true));
      let embed = new MessageEmbed()
      .setTitle(`🎶Pausing🎶`)
      .setDescription(`Pausing The Song`)
      .setColor("AQUA")
  
      await interaction.followUp({ embeds: [embed] })
    }
 
  }
}