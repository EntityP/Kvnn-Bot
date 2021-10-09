const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { player } = require("../..");

module.exports = {
  name: "now-playing",
  description: 'shows you whats plating rn',
  aliases: ["np", "nowPlaying"],
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
      const progressBar = guildQueue.createProgressBar();
      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel) return i("Please join a voice channel");
      if (guildQueue.isPlaying && voiceChannel.id !== message.guild.me.voice.channel.id) {

        const NotInTheSameChannelEmbed = new MessageEmbed()
          .setTitle(`❌ Not In The Same Channel`)
          .setDescription(`<@${message.author}>, We are not in the same voice channel.`)
          .setColor("RED")
          message.reply({ embeds: [NotInTheSameChannelEmbed] })

      } else if (!guildQueue.nowPlaying) {
        message.reply({ content: `There is no song playing.` })
      } else if(!message.guild.me.voice.channel) {

        const NotConnectedEmbed = new MessageEmbed()
          .setTitle("Not Connected")
          .setDescription("I am not connected to any voice channel")
          .setColor("RED")
          .setFooter(`Requested by: ${message.author} 🌌 ${new Date().toLocaleDateString()}`);

        return message.reply({ embeds: [NotConnectedEmbed] })
      } else {

        const NowPlayingEmbed = new MessageEmbed()
        .setTitle("💿 Now Playing")
        .addField("🎶 | Now Playing", `[\`${guildQueue.nowPlaying}\`](${guildQueue.nowPlaying.url})`)
        .addField("Progress", `${progressBar.prettier.replaceAll("=", "█").replace(">", "█")}`)
        .addField("Content Creator:", `\`${guildQueue.nowPlaying.author}\``, true)
        .addField("Volume", `\`${guildQueue.volume}%\``, true)
        .setImage(guildQueue.nowPlaying.thumbnail)
        .setColor("RANDOM")
        .setFooter(`Requested by: ${message.author} 🌌 ${new Date().toLocaleDateString()}`);
      message.channel.sendTyping(false)
      message.reply({ embeds: [NowPlayingEmbed] });
    }
    } catch (error) {
      message.reply(`Error: \`\`\`${error}\`\`\``)
    }
  },
};