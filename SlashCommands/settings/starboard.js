const { Client, CommandInteraction, MessageEmbed } = require('discord.js');
const starboardModel = require("../../models/starboard");
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
const starboardClient = require("../../client/starboard");
module.exports = {
    name: 'starboard',
    description: 'Set a starboard channel',
    options: [
        {
            name: 'starcount',
            type: 'INTEGER',
            description: 'amount of stars before geting sent to the channel',
            required: true,
        },
        {
            name: 'channel',
            type: 'CHANNEL',
            description: 'sends the message you tell it to',
            required: true,
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        const starCount = interaction.options.getInteger('starcount');
        const starChannel = interaction.options.getChannel('channel');

        let noPermmisons = new MessageEmbed().setColor(errorColor).setFooter(footer)
        .setDescription(`${errorEmoji} | You Don't Have \`Administrator\` permissions`)
        .setImage("https://cdn.discordapp.com/attachments/894612717434982423/894993577350950973/unknown.png")
        if(!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.followUp({ embeds: [noPermmisons] })
        }

        let notextchannel = new MessageEmbed().setFooter(footer).setColor(errorColor)
        .setDescription(` ${errorEmoji} | Please Choose A Text Channel \`#Text-Channel\``)

        if(starChannel.type !== 'GUILD_TEXT') return interaction.followUp({ embeds: [notextchannel] });

        const data = await starboardModel.findOne({ Guild: interaction.guildId });

        if(data) data.delete();

        new starboardModel({
            Guild: interaction.guildId,
            starCount: starCount,
            starboardChannel: starChannel.id,
        }).save();

        starboardClient.config.guilds.add({
            id: interaction.guildId,
            options: {
                starCount: starCount,
                starboardChannel: starChannel.id,
            }
        })
        let finish = new MessageEmbed().setFooter(footer).setColor(sucsessColor)
        .setTitle(`Set New Channel`)
        .setDescription(` ${sucsessEmoji} | Your Guild StarBoard Data Has Been Updated To ${starChannel}. You StarCount Data Is Now ${starCount}`)

        interaction.followUp({ embeds: [finish] });
    }
}