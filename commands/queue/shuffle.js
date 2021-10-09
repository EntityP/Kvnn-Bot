const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "shuffle",
  description: "shuffle the songs!",

  run: async(client, message, args) => {
    const i = message.reply;

    const vc = message.member.voice.channel
  if(!message.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" });

  let guildQueue = client.player.getQueue(message.guild.id);
  guildQueue.shuffle();

  let embed = new MessageEmbed()
  .setTitle(`🎶Shuffling🎶`)
  .setDescription(`All Songs Are Now Shuffled`)
  .setColor("AQUA")

  await message.reply({ embeds: [embed] })

  }
}