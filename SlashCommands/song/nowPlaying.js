const { Message, Client, MessageEmbed, CommandInteraction } = require("discord.js");
const { player } = require("../..");

module.exports = {
  name: "now-playing",
  description: 'shows you whats plating rn',
  aliases: ["np", "nowPlaying"],
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
      const subCommand = interaction.options.getSubcommand()
      if(subCommand === 'song') {
      let guildQueue = client.player.getQueue(interaction.guild.id);
      const progressBar = guildQueue.createProgressBar();
      const voiceChannel = interaction.member.voice.channel;
      if (!voiceChannel) return interaction.followUp("Please join a voice channel");
      if (guildQueue.isPlaying && voiceChannel.id !== interaction.guild.me.voice.channel.id) {

        const NotInTheSameChannelEmbed = new MessageEmbed()
          .setTitle(`❌ Not In The Same Channel`)
          .setDescription(`<@${interaction.author}>, We are not in the same voice channel.`)
          .setColor("RED")
        interaction.followUp({ embeds: [NotInTheSameChannelEmbed] })

      } else if (!guildQueue.nowPlaying) {
        interaction.followUp({ content: `There is no song playing.` })
      } else if(!interaction.guild.me.voice.channel) {

        const NotConnectedEmbed = new MessageEmbed()
          .setTitle("Not Connected")
          .setDescription("I am not connected to any voice channel")
          .setColor("RED")
          .setFooter(`Requested by: ${interaction.author} 🌌 ${new Date().toLocaleDateString()}`);

        return interaction.followUp({ embeds: [NotConnectedEmbed] })
      } else {

        const NowPlayingEmbed = new MessageEmbed()
        .setTitle("💿 Now Playing")
        .addField("🎶 | Now Playing", `[\`${guildQueue.nowPlaying}\`](${guildQueue.nowPlaying.url})`)
        .addField("Progress", `${progressBar.prettier.replaceAll("=", "█").replace(">", "█")}`)
        .addField("Content Creator:", `\`${guildQueue.nowPlaying.author}\``, true)
        .addField("Volume", `\`${guildQueue.volume}%\``, true)
        .setImage(guildQueue.nowPlaying.thumbnail)
        .setColor("RANDOM")
        .setFooter(`Requested by: ${interaction.author} 🌌 ${new Date().toLocaleDateString()}`);
      interaction.channel.sendTyping(false)
      interaction.followUp({ embeds: [NowPlayingEmbed] });
      }
    }
    } catch (error) {
     interaction.followUp(`Error: \`\`\`${error}\`\`\``)
    }
  },
};