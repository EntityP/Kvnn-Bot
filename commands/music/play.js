const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")

module.exports = {
  name: "play",
  description: "Play a song!",

  run: async(client, message, args) => {

    const vc = message.member.voice.channel
  if(!message.member.voice.channel) return message.reply({ content: "Please join a voice channel first!" })
 
  const query = args.join(" ");
  if(!query) return message.reply({ content: "Please provide a song to play!"})

  let queue = client.player.createQueue(message.guild.id);
      await queue.join(message.member.voice.channel);
      let song = await queue.play(args.join(' ')).catch(_ => {
          if(!queue)
              queue.stop();
      });
      let embed = new MessageEmbed()
      .setTitle(`🎶Playing🎶`)
      .setDescription(`🎶 ${song} has been added to the queue`)
      .setColor("AQUA")
message.reply({ embeds: [embed] })
}
}