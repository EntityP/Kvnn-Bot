// make sure to give me perms to kick suck as a role higher than the kick you want to kick!
const { Client, Message, MessageEmbed, CommandInteraction} = require('discord.js');
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: "ban",
    description: "To ban some one from the server.",
    type: 'CHAT_INPUT',
    options: [
        {
            name: "target",
            description: "To find a target to ban.",
            type: 'USER',
            required: true,
        },
        {
            name: "reason",
            description: "To give a reason to ban the user.",
            type: 'STRING',
            required: false,
        }
    ],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

     run: async (client, interaction, args) => {
         const target = interaction.options.getMember('target');
         const reason = 
         interaction.options.getString('reason') || "No reason provided";

         let noPermmisons = new MessageEmbed().setColor(errorColor).setFooter(footer)
         .setDescription(`${errorEmoji} | You Don't Have \`Ban Members\` permissions`)
         .setImage("https://cdn.discordapp.com/attachments/894612717434982423/894652999635464352/unknown.png")
         if(!interaction.member.permissions.has("BAN_MEMBERS")) {
             return interaction.followUp({ embeds: [noPermmisons] })
         }

            let kickdm = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setDescription(`${astro} | You have been Banned from **${interaction.guild.name}**, Reason: ${reason}`)
           await target.send({ embeds: [kickdm] });

           target.ban({ target });

            let banmsg = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setTitle(`${target.user.tag} Banned`)
            .setDescription(`${sucsessEmoji} | Banned ${target.user.tag} from ${interaction.guild.name}. reason: ${reason}`)

            interaction.followUp({ embeds: [banmsg] });
     },
};