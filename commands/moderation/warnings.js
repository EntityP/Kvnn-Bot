const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require("moment");
const warnModel = require("../../models/warnModel");
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'warnings',
    description: 'display a user or your warnings',
 
    /** 
     * @param {Client} client 
     * @param {Message} interaction 
     * @param {String[]} args 
     */
    
    run: async(client, interaction, args) => {
        const user = interaction.mentions.members.first();

        if(!user) return interaction.reply({ content: 'Please Give A User' })

        const userWarnings = await warnModel.find({
            userId: user.id,
            guildId: interaction.guildId,
        });

        let nowarns = new MessageEmbed().setColor(errorColor).setFooter(footer)
        .setDescription(`${errorEmoji} | ${user} has no warns on there user name`)
        if(!userWarnings?.length)
        return interaction.followUp({ embeds: [nowarns] });

        const embedDescription = userWarnings.map((warn) => {
            const moderator = interaction.guild.members.cache.get(
                warn.moderatorId
            );
            return [
                `warnId: ${warn._id}`,
                `Moderator: ${moderator || "Has Left"}`,
                `Date Of Warn: ${moment(warn.timestamp).format("MMM Do YYYY")}`
            ].join("\n")
        })
        .join("\n\n");

        let finish = new MessageEmbed().setColor(sucsessColor).setFooter(footer).
        setTitle(`${user}'s warnings'`)
        .setDescription(embedDescription)

        interaction.reply({ embeds: [finish] });
    }
}