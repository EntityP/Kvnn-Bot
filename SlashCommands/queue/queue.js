const { Client, Message, MessageEmbed, CommandInteraction } = require("discord.js")
module.exports = {
  name: "queue",
  description: "Shows the guilds queue!",
  options: [
    {
      name: 'queue',
      description: 'queue commands',
      type: 'SUB_COMMAND',
    }
  ],
/**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

  run: async(client, interaction, args) => {
    try {
      const subCommand = interaction.options.getSubcommand();

      if(subCommand === 'queue') {
        let guildQueue = client.player.getQueue(interaction.guild.id);
  
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.followUp({ content: "Please join a voice channel" });
    
        if (
          guildQueue.isPlaying &&
          voiceChannel.id !== interaction.guild.me.voice.channel.id
        ) {
          const NotInTheSameChannelEmbed = new MessageEmbed()
            .setTitle(`❌ Not In The Same Channel`)
            .setDescription(
              `<@${message.author.id}>, We are not in the same voice channel.`
            )
            .setColor("RED");
          return interaction.followUp({ embeds: [NotInTheSameChannelEmbed] });
        } else {
          if (guildQueue.songs) {
            const Queuemap = guildQueue.songs.map((song, index) => `**${index + 1})** [\`${song.name}\`](${song.url}) - ${song.duration}`).join(",\n");
            const queueEmbed = new MessageEmbed()
              .setFooter(`Requested by: ${interaction.author} 🌌 ${new Date().toLocaleDateString()}`)
              .setTitle(`🎶 The music queue for ${interaction.guild.name}`)
              .setDescription(`
              Now Playing: [\`${guildQueue.nowPlaying.name}\`](${guildQueue.nowPlaying.url}) \`- ${guildQueue.nowPlaying.duration}\`\n
              \n${Queuemap ? Queuemap : "There are currently no songs in queue."}`)
              .setThumbnail(guildQueue.nowPlaying.thumbnail)
              .setColor("RANDOM");
            interaction.followUp({ embeds: [queueEmbed] });
          } else if(!interaction.guild.me.voice.channel) {
    
            const NotConnectedEmbed = new MessageEmbed()
              .setTitle("Not Connected")
              .setDescription("I am not connected to any voice channel")
              .setColor("RED")
              .setFooter(`Requested by: ${interaction.author} 🌌 ${new Date().toLocaleDateString()}`);
    
            return interaction.followUp({ embeds: [NotConnectedEmbed] })
          }
        }
      }
      } catch (error) {
        const queue = client.player.createQueue(interaction.guild.id)
        queue.connection.leave();
        interaction.followUp({ content: `${error}` })
      }
       
    },
  };