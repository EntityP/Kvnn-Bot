const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "progressbar",
  description: "shows you how far in the song is",
  
  run: async(client, message, args) => {
    const i = message.reply;

    const vc = message.member.voice.channel


      if(!interaction.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" });

      let guildQueue = client.player.getQueue(message.guild.id);
      const ProgressBar = guildQueue.createProgressBar();
      let embed = new MessageEmbed()
      .setTitle(`🎶ProgressBar🎶`)
      .setDescription(`${ProgressBar}`)
      .setColor("AQUA")
  
      await message.reply({ embeds: [embed] })
  }
}