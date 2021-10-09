const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "set-volume",
  description: "change the volume!",


  run: async(client, message, args) => {
    const vc = message.member.voice.channel
    if(!message.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" });
    const amount = args.join(" ");

    if(!amount) return message.reply({ content: 'Please Give A Amount' });

    let guildQueue = client.player.getQueue(message.guild.id);
    guildQueue.setVolume(parseInt(amount));
    let embed = new MessageEmbed()
    .setTitle(`🎶Volume🎶`)
    .setDescription(`Volume Changed`)
    .setColor("AQUA")

    await message.reply({ embeds: [embed] })
    }
  }

