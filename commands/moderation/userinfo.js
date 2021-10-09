const { Client, Message, MessageEmbed } = require('discord.js');
const moment = require("moment");
require("moment-duration-format");
module.exports = {
    name: 'userinfo',
    description: 'gives you info on a user',

    /** 
     * @param {Client} client 
     * @param {Message} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const user = interaction.mentions.members.first();

        const userRoles = user.roles.cache.map((x) => x).filter((z) => z.name !== "@everyone");

        let stat = user.presence.activities[0];
        let custom;

        let embed = new MessageEmbed()
        .setColor("AQUA")
        .setDescription(`here is ${user}'s info'`)
        .addFields(
            {
                name: 'Name',
                value: `${user}`,
                inline: true,
            },
            {
                name: 'ID',
                value: `${user.id}`,
                inline: true,
            },
            {
                name: 'Tag',
                value: `${user.user.tag}`,
                inline: true,
            },
            {
                name: 'Status',
                value: `Playing ${stat || 'User dose not have a status right now'}`,
                inline: true,
            },
            {
                name: 'Created At',
                value: `${moment(user.user.createdAt).format(
                    "MMMM Do YYYY, H:mm:ss a"
                  )}`,
                  inline: true,
            },
            {
                name: 'Roles',
                value: `${user.roles.cache.map((x) => x).filter((z) => z.name )}`,
            },
        )
        .setThumbnail(user.user.displayAvatarURL({ format: 'jpg' || 'gif' }))

        interaction.reply({ embeds: [embed] })
    }
}