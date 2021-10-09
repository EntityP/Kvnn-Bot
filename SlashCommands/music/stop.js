const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "stop",
  description: "stop a song!",
  options: [
    {
      name: 'music',
      description: 'play some music',
      type: 'SUB_COMMAND',
    },
  ],

  run: async(client, interaction, args) => {

    const vc = interaction.member.voice.channel;
    const subCommand = interaction.options.getSubcommand();

    if(subCommand === 'music') {
      if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" })


    let queue = client.player.createQueue(interaction.guild.id);
    queue.stop();

    let embed = new MessageEmbed()
    .setTitle(`🎶Stoping🎶`)
    .setDescription(`Now Stoping The Music`)
    .setColor(`AQUA`)
interaction.followUp({ embeds: [embed] });
    }
    
  }
}