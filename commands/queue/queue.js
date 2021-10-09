const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")
module.exports = {
  name: "queue",
  description: "Shows the guilds queue!",
  
/**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

  run: async(client, message, args) => {
    try {

      const i = message.reply;

        let guildQueue = client.player.getQueue(message.guild.id);
  
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply({ content: "Please join a voice channel" });
    
        if (
          guildQueue.isPlaying &&
          voiceChannel.id !== message.guild.me.voice.channel.id
        ) {
          const NotInTheSameChannelEmbed = new MessageEmbed()
            .setTitle(`❌ Not In The Same Channel`)
            .setDescription(
              `<@${message.author.id}>, We are not in the same voice channel.`
            )
            .setColor("RED");
          return message.reply({ embeds: [NotInTheSameChannelEmbed] });
        } else {
          if (guildQueue.songs) {
            const Queuemap = guildQueue.songs.map((song, index) => `**${index + 1})** [\`${song.name}\`](${song.url}) - ${song.duration}`).join(",\n");
            const queueEmbed = new MessageEmbed()
              .setFooter(`Requested by: ${message.author} 🌌 ${new Date().toLocaleDateString()}`)
              .setTitle(`🎶 The music queue for ${message.guild.name}`)
              .setDescription(`
              Now Playing: [\`${guildQueue.nowPlaying.name}\`](${guildQueue.nowPlaying.url}) \`- ${guildQueue.nowPlaying.duration}\`\n
              \n${Queuemap ? Queuemap : "There are currently no songs in queue."}`)
              .setThumbnail(guildQueue.nowPlaying.thumbnail)
              .setColor("RANDOM");
              message.reply({ embeds: [queueEmbed] });
          } else if(!message.guild.me.voice.channel) {
    
            const NotConnectedEmbed = new MessageEmbed()
              .setTitle("Not Connected")
              .setDescription("I am not connected to any voice channel")
              .setColor("RED")
              .setFooter(`Requested by: ${message.author} 🌌 ${new Date().toLocaleDateString()}`);
    
            return message.reply({ embeds: [NotConnectedEmbed] })
          }
        }
      } catch (error) {
        const queue = client.player.createQueue(message.guild.id)
        queue.connection.leave();
        message.reply({ content: `${error}` })
      }
       
    },
  };