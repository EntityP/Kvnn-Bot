const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const moment = require("moment");
const warnModel = require("../../models/warnModel");
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'warnings',
    description: 'display a user or your warnings',
    options: [
        {
            name: 'target',
            description: 'get the users warns',
            type: 'USER',
            required: true
        }
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const user = interaction.options.getUser('target');

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

        interaction.followUp({ embeds: [finish] });
    }
}