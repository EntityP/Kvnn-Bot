const { Client, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton, Message } = require('discord.js');
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'invite',
    description: 'invite the bot + server',
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async(client, message, args) => {
        let button1 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel(`Bot Invite`)
            .setStyle('LINK')
            .setURL(`https://discord.com/oauth2/authorize?client_id=830038772123959296&scope=bot%20applications.commands&permissions=8589934591`)
        )

        let button2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel(`Support Server`)
            .setStyle('LINK')     
            .setURL('https://discord.gg/CaECM4VZzT')
        )

        let button3 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel(`Website`)
            .setStyle(`LINK`)
            .setURL(`https://www.kvnn.net/`)
        )
        let invite = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
        .setDescription(`Invite Me Or Join Kvnn Dev`)

        message.reply({ components: [button1, button2, button3], embeds: [invite] });
    }
}