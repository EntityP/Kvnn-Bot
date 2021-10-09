const { Client, CommandInteraction, MessageEmbed, Invite, Message } = require('discord.js');
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'unban',
    description: 'to unban someone',
    /** 
     * @param {Client} client 
     * @param {Message} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {

        let noPermmisons = new MessageEmbed().setColor(errorColor).setFooter(footer)
        .setDescription(`${errorEmoji} | You Don't Have \`Ban Members\` permissions`)
        .setImage("https://cdn.discordapp.com/attachments/894612717434982423/894652999635464352/unknown.png")
        if(!interaction.member.permissions.has("BAN_MEMBERS")) {
            return interaction.reply({ embeds: [noPermmisons] })
        }

        const userId = args.join(" ");

        if(!userId) return interaction.reply({ content: `Please Give A user Id` });
       
        interaction.guild.members
        .unban(userId)
        .then((user) => {
            let finish = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setTitle(`💥 Unbanned`)
            .setDescription(`${sucsessEmoji} | ${user.tag} Is Now Unbanned They Will Now Get A DM`)
    
            interaction.reply({ embeds: [finish] });

            let dm = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setDescription(`${astro} | You Have Been Unbanned From **${interaction.guild.name}**`)

            user.send({ embeds: [dm] })
        })
    }
}