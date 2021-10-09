// make sure to give me perms to kick suck as a role higher than the kick you want to kick!
const { Client, Message, MessageEmbed } = require('discord.js');
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json")
const { footer } = require("../../embeds/embedText.json")
module.exports = {
    name: "kick",
    description: "To kick some one from the server.",
    type: 'CHAT_INPUT',

    /**
     *
     * @param {Client} client
     * @param {Message} interaction
     * @param {String[]} args
     */

     run: async (client, interaction, args) => {
         const target = interaction.mentions.members.first();
         const reason = 
         args.join(" ") || "No reason provided";

         let noPermmisons = new MessageEmbed().setColor(errorColor).setFooter(footer)
         .setDescription(`${errorEmoji} | You Don't Have \`Kick Members\` permissions`)
         .setImage("https://cdn.discordapp.com/attachments/894612717434982423/894642048852959232/unknown.png")
         if(!interaction.member.permissions.has("KICK_MEMBERS")) {
             return interaction.reply({ embeds: [noPermmisons] })
         }

            let kickdm = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setDescription(`${astro} | You have been kicked from **${interaction.guild.name}**, Reason: ${reason}`)
           await target.send({ embeds: [kickdm] });

            target.kick(reason);

            let kickmsg = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setTitle(`${target.user.tag} Kicked`)
            .setDescription(`${sucsessEmoji} | Kicked ${target.user.tag} from ${interaction.guild.name}. reason: ${reason}`)

            interaction.reply({ embeds: [kickmsg] });
     },
};