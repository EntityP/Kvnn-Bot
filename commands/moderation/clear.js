const {
    Client,
    CommandInteraction,
    MessageEmbed,
    Message,
} = require('discord.js');
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'clear',
    description: 'A simple clear command',

    /**
     * 
     * @param {Client} client 
     * @param {Message} interaction
     */

    run: async (client, interaction) => {
        let noPermmisons = new MessageEmbed().setColor(errorColor).setFooter(footer)
        .setDescription(`${errorEmoji} | You Don't Have \`Manage Channels\` permissions`)
        .setImage("https://cdn.discordapp.com/attachments/894612717434982423/894676155578347561/unknown.png")
        if(!interaction.member.permissions.has("MANAGE_CHANNELS")) {
            return interaction.followUp({ embeds: [noPermmisons] })
        }
        let query = args.join(" ");

        if(!query) return interaction.reply({ content: 'Please Give A Number Of Messages' })

        interaction.channel.bulkDelete(query.value)


        let purgemsg = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
        .setTitle(`Purged ${query.value}`)
        .setDescription(`${sucsessEmoji} | I deleted ${query.value} messages`)
        
        interaction.reply({ embeds: [purgemsg] }).then((msg) => {
            setTimeout(() => msg.delete(), 5000)
        })
    }
}