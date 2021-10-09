const { Client, Message, MessageEmbed } = require('discord.js');
const warnModel = require("../../models/warnModel");
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'remove-warn',
    description: 'remove a warn from a user',
  
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
            return interaction.followUp({ embeds: [noPermmisons] })
        }
        
        const warnID = args.join(" ");
        if(!warnID) return interaction.reply({ content: 'Please Give A ID. The WarnId' });

        const data = await warnModel.findById(warnID);

        let nodata = new MessageEmbed().setColor(errorColor).setFooter(footer)
        .setDescription(`${errorEmoji} | No warn With This Id`)
        if(!data) return interaction.reply({ embeds: [nodata] });

        data.delete();

        const user = interaction.guild.members.cache.get(data.userId);

        let finish = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
        .setDescription(`${sucsessEmoji} | Removed The Warn Of The User. WarnID: ${warnID}`)

        interaction.reply({ embeds: [finish] })
    }
}