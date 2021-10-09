
const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "resume",
  description: "resume a song",
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
    guildQueue.setPaused(false);

    //  let guildQueue = client.player.getQueue(interaction.guild.id)
    // .then(await guildQueue.setPaused(true));
    let embed = new MessageEmbed()
    .setTitle(`🎶Resuming🎶`)
    .setDescription(`Resuming The Song`)
    .setColor("AQUA")

    await interaction.followUp({ embeds: [embed] })
}
    
  }
}