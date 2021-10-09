const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "skip",
  description: "skip a song!",
  options: [
    {
      name: 'music',
      description: 'play some music',
      type: 'SUB_COMMAND',
    },
  ],

  run: async(client, interaction, args) => {
    const vc = interaction.member.voice.channel
    const subCommand = interaction.options.getSubcommand();
if(subCommand === 'music') {
  if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" });

  let guildQueue = client.player.getQueue(interaction.guild.id);
  guildQueue.skip();

  let embed = new MessageEmbed()
  .setTitle(`🎶Skiping🎶`)
  .setDescription(`Skiping The Song`)
  .setColor("AQUA")

  await interaction.followUp({ embeds: [embed] })
}

  }
}