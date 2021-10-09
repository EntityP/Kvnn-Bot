
const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "resume",
  description: "resume a song",
 

  run: async(client, message, args) => {
    const vc = message.member.voice.channel

  if(!message.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" });

    let guildQueue = client.player.getQueue(message.guild.id);
    guildQueue.setPaused(false);

    //  let guildQueue = client.player.getQueue(interaction.guild.id)
    // .then(await guildQueue.setPaused(true));
    let embed = new MessageEmbed()
    .setTitle(`🎶Resuming🎶`)
    .setDescription(`Resuming The Song`)
    .setColor("AQUA")

    await message.reply({ embeds: [embed] })
  }
}