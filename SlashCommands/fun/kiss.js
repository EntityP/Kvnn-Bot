const axios = require('axios');
const { MessageEmbed, CommandInteraction } = require('discord.js')

module.exports = {
        name: "kiss",
        category: "fun",
        noalias: [''],
        description: "kisses a person",
        usage: "<mention>",
        accesableby: "everyone",
        options: [
            {
                name: "user",
                description: "To find a target to ban.",
                type: 'USER',
                required: true,
            }
        ],
            /** 
             * @param {Client} client 
             * @param {CommandInteraction} interaction 
             * @param {String[]} args 
             */

    run: async (bot, interaction, args) => {
        const url = 'https://waifu.pics/api/sfw/kiss';

        const member = interaction.options.getMember('user');

        const sender = interaction.user;
        
        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return interaction.followUp(`An error has occured, try again!`)
        }
       
        if (!args[0]) return interaction.followUp({
                       embeds: {
                    description: ":cinfo: please mention a member!",
                    color: "738add",
                    },
            });

        const embed = new MessageEmbed()
            .setDescription(`${member}, got kissed by ${sender}`)
            .setColor('#2f3136')
            .setImage(data.url)

        await interaction.followUp({ embeds: [embed] })
    }
}