const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "set-volume",
  description: "change the volume!",
  options: [
      {
        name: 'song',
        description: 'Song commands',
        type: 'SUB_COMMAND',
        options: [
          {
            name: 'amount',
            description: 'set the amount',
            type: 'STRING',
            required: true,
        },
        ]
      }
  ],

  run: async(client, interaction, args) => {
    const vc = interaction.member.voice.channel
    const subCmd = interaction.options.getSubcommand();
    if(subCmd === 'song') {
    if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" });
    const amount = interaction.options.getString('amount');

    let guildQueue = client.player.getQueue(interaction.guild.id);
    guildQueue.setVolume(parseInt(amount));
    let embed = new MessageEmbed()
    .setTitle(`🎶Volume🎶`)
    .setDescription(`Volume Changed`)
    .setColor("AQUA")

    await interaction.followUp({ embeds: [embed] })
    }
  }
}

