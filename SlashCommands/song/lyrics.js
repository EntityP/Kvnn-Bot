const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { player } = require("../..");
const yt = require('yt-lirik');

module.exports = {
  name: "lyric",
  description: 'get the lyrics of a song',
  aliases: ["lyrics", "ly", "lyr"],
  UserPerms: ["SEND_MESSAGES", "CONNECT"],
  BotPerms: ["SEND_MESSAGES", "CONNECT"],
  options: [
    {
      name: 'song',
      description: 'Song commands',
      type: 'SUB_COMMAND',
    }
  ],
  /**
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    try {
      const subCommand = interaction.options.getSubcommand();
      if(subCommand === 'song') {
      let guildQueue = client.player.getQueue(interaction.guild.id);
      const voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) return interaction.followUp("Please join a voice channel");
  
      if (guildQueue.isPlaying && voiceChannel.id !== interaction.guild.me.voice.channel.id) {
        const NotInTheSameChannelEmbed = new MessageEmbed()
          .setTitle(`❌ Not In The Same Channel`)
          .setDescription(`<@${message.author}>, We are not in the same voice channel.`)
          .setColor("RED");
        return interaction.followUp({ embeds: [NotInTheSameChannelEmbed] });
      }
      if (!interaction.guild.me.voice.channel) {
          const notPlayingEmbed = new MessageEmbed()
              .setTitle("I am not connected")
              .setDescription(`🔇 | <@${message.author.id}> I am not connected to any voice channel.`)
              .setColor("RED")
              interaction.followUp({ embeds: [notPlayingEmbed] })
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
        .setFooter(`Requested by: ${interaction.author} 🌌 ${new Date().toLocaleDateString()}`)
        interaction.followUp({ embeds: [LyricsEmbed] })
    }
    } catch (error) {
      message.channel.send(`Lyrics: \`\`\`${error.interaction === undefined ? 'No lyrics for this song' : 'No lyrics for this song'}\`\`\``);
    }
  },
};