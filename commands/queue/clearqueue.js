
const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "clear-queue",
  description: "clear the queue",

  run: async(client, message, args) => {
    const vc = message.member.voice.channel
    const i = message.reply;

  if(!message.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" });

    let guildQueue = client.player.getQueue(message.guild.id);
    guildQueue.clearQueue();


    let embed = new MessageEmbed()
    .setTitle(`🎶Clearing🎶`)
    .setDescription(`Cleared Queue`)
    .setColor("AQUA")

    await message.reply({ embeds: [embed] })
  }
}