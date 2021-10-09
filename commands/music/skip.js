const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "skip",
  description: "skip a song!",

  run: async(client, message, args) => {

    const vc = message.member.voice.channel
  if(!message.member.voice.channel) return message.reply  ({ content: "Please join a voice channel first!" });

  let guildQueue = client.player.getQueue(message.guild.id);
  guildQueue.skip();

  let embed = new MessageEmbed()
  .setTitle(`🎶Skiping🎶`)
  .setDescription(`Skiping The Song`)
  .setColor("AQUA")

  await message.reply({ embeds: [embed] })

  }
}