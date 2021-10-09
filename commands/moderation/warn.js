const { Client, CommandInteraction, MessageEmbed, Message } = require('discord.js');
const warnModel = require("../../models/warnModel");
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'warn',
    description: 'warn a user',

    /** 
     * @param {Client} client 
     * @param {Message} interaction 
     * @param {String[]} args 
     */

    run: async(client, interaction, args) => {
        let noPermmisons = new MessageEmbed().setColor(errorColor).setFooter(footer)
        .setDescription(`${errorEmoji} | You Don't Have \`Manage Guild\` permissions`)
        .setImage("https://cdn.discordapp.com/attachments/894999198083198976/896116825895628810/unknown.png")
        if(!interaction.member.permissions.has("MANAGE_GUILD")) {
            return interaction.reply({ embeds: [noPermmisons] })
        }

        const user = interaction.mentions.members.first();
        const reason = args.join(" ");

        if(!user) return interaction.reply({ content: 'Please Ping A User' });
        if(!reason) return interaction.reply({content: 'Please Give A Reason For This Warn' })

        new warnModel({
            userId: user.id,
            guildId: interaction.guildId,
            moderatorId: interaction.author.id,
            reason,
            timestamp: Date.now(),
        }).save();

        let finish = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
        .setDescription(`${sucsessEmoji} | I have warned ${user} For : ${reason}`)

        interaction.reply({ embeds: [finish] });

        let dm = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
        .setDescription(`${astro} | You have been warned in ${interaction.guild.name}, For : ${reason} | To check how many warns you go please run \`/warnings ${user}\``)

        user.send({ embeds: [dm] });
    }
}