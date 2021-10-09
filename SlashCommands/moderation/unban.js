const { Client, CommandInteraction, MessageEmbed, Invite } = require('discord.js');
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'unban',
    description: 'to unban someone',
    options: [
        {
            name: 'userid',
            type: 'STRING',
            description: 'get the userid',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        let noPermmisons = new MessageEmbed().setColor(errorColor).setFooter(footer)
        .setDescription(`${errorEmoji} | You Don't Have \`Ban Members\` permissions`)
        .setImage("https://cdn.discordapp.com/attachments/894612717434982423/894652999635464352/unknown.png")
        if(!interaction.member.permissions.has("BAN_MEMBERS")) {
            return interaction.followUp({ embeds: [noPermmisons] })
        }

        const userId = interaction.options.getString('userid');

       
        interaction.guild.members
        .unban(userId)
        .then((user) => {
            let finish = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setTitle(`💥 Unbanned`)
            .setDescription(`${sucsessEmoji} | ${user.tag} Is Now Unbanned They Will Now Get A Invite`)
    
            interaction.followUp({ embeds: [finish] });

            let dm = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setDescription(`${astro} | You Have Been Unbanned From **${interaction.guild.name}**`)
        })
    }
}