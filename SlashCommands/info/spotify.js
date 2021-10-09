const { CommandInteraction, Client, MessageEmbed } = require('discord.js');
const API = require('leoapi.xyz');
const leo = new API();
module.exports = {
  name: 'spotify',
  description: 'Play something in spotify',
  options: [
      {
          name: 'name',
          required: true,
          description: 'Name of song',
          type: 'STRING'
      }, 
      {
          name: 'title',
          required: false,
          description: 'Title of album',
          type: 'STRING'
      },
      {
          name: 'artist',
          type: 'STRING',
          description: 'Artist of the song',
          required: false
      },
      {
          name: 'user',
          type: 'USER',
          required: false,
          description: 'The song image'
      }
  ],
  /**
    @param {CommandInteraction} interaction
    @param {Client} client
    @param {String[]} args
  */
  run: async(client, interaction, args) => {
    const name = interaction.options.getString('name');
    const title = interaction.options.getString('title');
    const artist = interaction.options.getString('artist')
    const user = interaction.options.getUser('user')

    const title1 = title ? title : 'No title'
    const artist1 = artist ? artist : 'No Artist'

    if(user) {
        leo.image('spotify', {
            name: name,
            title: title1,
            artist: artist1,
            image: user.displayAvatarURL({ dynamic: true, format: 'jpg'})
        }).then(image => interaction.followUp({ files: [image]}))
    } else {
        leo.image('spotify', {
            name: name,
            title: title1,
            artist: artist1,
            image: interaction.member.user.displayAvatarURL({ dynamic: true, format: 'jpg'})
        }).then(image => interaction.followUp({ files: [image]}))
    }
  }
}