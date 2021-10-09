const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "play",
  description: "Play a song!",
  options: [
    {
      name: 'music',
      description: 'play some music',
      type: 'SUB_COMMAND',
      options: [
        {
          name: 'song',
          description: 'to play a song',
          type: 'STRING',
          required: true,
      },
      ]
     },
  ],

  run: async(client, interaction, args) => {

    const subCommand = interaction.options.getSubcommand();
    const vc = interaction.member.voice.channel
if(subCommand === 'music') {
  if(!interaction.member.voice.channel) return interaction.followUp({ content: "Please join a voice channel first!" })

  if(!interaction.guild.me.permissions.has("CONNECT")) return interaction.followUp({ content: "No permission to connect to that voice channel"})

 
  const query = interaction.options.getString('song')
  if(!query) return interaction.followUp({ content: "Please provide a song to play!"})

  let queue = client.player.createQueue(interaction.guild.id);
      await queue.join(interaction.member.voice.channel);
      let song = await queue.play(args.join(' ')).catch(_ => {
          if(!queue)
              queue.stop();
      });
      let embed = new MessageEmbed()
      .setTitle(`🎶Playing🎶`)
      .setDescription(`🎶 ${song} has been added to the queue`)
      .setColor("AQUA")
interaction.followUp({ embeds: [embed] })
}
  }
}