
const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "clear-queue",
  description: "clear the queue",
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
    guildQueue.clearQueue();


    let embed = new MessageEmbed()
    .setTitle(`🎶Clearing🎶`)
    .setDescription(`Cleared Queue`)
    .setColor("AQUA")

    await interaction.followUp({ embeds: [embed] })
}
  
  }
}