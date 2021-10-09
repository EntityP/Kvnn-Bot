const axios = require('axios');
const { MessageEmbed, CommandInteraction, Message } = require('discord.js')

module.exports = {
        name: "kiss",
        category: "fun",
        noalias: [''],
        description: "kisses a person",
        usage: "<mention>",
        accesableby: "everyone",

            /** 
             * @param {Client} client 
             * @param {Message} message 
             * @param {String[]} args 
             */

    run: async (bot, message, args) => {
        const url = 'https://waifu.pics/api/sfw/kiss';

        const member = message.mentions.members.first();

        const sender = message.author;
        
        let data, response;
        try {
            response = await axios.get(url);
            data = response.data;
        } catch (e) {
            return message.reply(`An error has occured, try again!`)
        }
       
        if (!args[0]) return message.reply({
                       embeds: {
                    description: ":cinfo: please mention a member!",
                    color: "738add",
                    },
            });

        const embed = new MessageEmbed()
            .setDescription(`${member}, got kissed by ${sender}`)
            .setColor('#2f3136')
            .setImage(data.url)

        await message.reply({ embeds: [embed] })
    }
}