const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { player } = require("../..");
const yt = require('yt-lirik');

module.exports = {
  name: "lyric",
  description: 'get the lyrics of a song',
  aliases: ["lyrics", "ly", "lyr"],
  UserPerms: ["SEND_MESSAGES", "CONNECT"],
  BotPerms: ["SEND_MESSAGES", "CONNECT"],
 
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */
  run: async (client, message, args) => {
    try {

      let guildQueue = client.player.getQueue(message.guild.id);
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return message.reply("Please join a voice channel");
  
      if (guildQueue.isPlaying && voiceChannel.id !== message.guild.me.voice.channel.id) {
        const NotInTheSameChannelEmbed = new MessageEmbed()
          .setTitle(`❌ Not In The Same Channel`)
          .setDescription(`<@${message.author}>, We are not in the same voice channel.`)
          .setColor("RED");
        return message.reply({ embeds: [NotInTheSameChannelEmbed] });
      }
      if (!message.guild.me.voice.channel) {
          const notPlayingEmbed = new MessageEmbed()
              .setTitle("I am not connected")
              .setDescription(`🔇 | <@${message.author.id}> I am not connected to any voice channel.`)
              .setColor("RED")
              message.reply({ embeds: [notPlayingEmbed] })
      }
      const res = await yt.getLyrics(guildQueue.nowPlaying.url);
      const LyricsEmbed = new MessageEmbed()
        .setTitle(`Lyrics`)
        .setDescription(`
        Song: **${res.song}**
        Artist: **${res.artist}**
        \`\`\`${res.lyrics}\`\`\`
        `)
        .setColor("RANDOM")
        .setFooter(`Requested by: ${message.author} 🌌 ${new Date().toLocaleDateString()}`)
        message.reply({ embeds: [LyricsEmbed] })

    } catch (error) {
      message.channel.send(`Lyrics: \`\`\`${error.interaction === undefined ? 'No lyrics for this song' : 'No lyrics for this song'}\`\`\``);
    }
  },
};