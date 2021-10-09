const { Client, CommandInteraction, MessageEmbed, Message } = require('discord.js');
const customCommandModel = require("../../models/customComands");
const { errorColor, sucsessColor } = require("../../embeds/embedColor.json");
const { sucsessEmoji, errorEmoji, astro } = require("../../embeds/embedEmojis.json");
const { footer } = require("../../embeds/embedText.json");
module.exports = {
    name: 'custom',
    description: 'Add custom commands',
    options: [
        {
            name: 'create',
            description: 'create a custom command',
            type: 'SUB_COMMAND',
            options: [
                {
                    name: 'command',
                    description: 'name of the custom command',
                    type: 'STRING',
                    required: true,
                },
                {
                    name: 'response',
                    description: 'The response of the command',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
        {
            name: "delete",
            type: 'SUB_COMMAND',
            description: "Delete a custom command",
            options: [
                {
                    name: 'command',
                    description: 'name of the custom command',
                    type: 'STRING',
                    required: true,
                },
            ],
        },
    ],
    /** 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     * @param {String[]} args 
     */
    run: async(client, interaction, args) => {
        let noPermmisons = new MessageEmbed().setColor(errorColor).setFooter(footer)
        .setDescription(`${errorEmoji} | You Don't Have \`Administrator\` permissions`)
        .setImage("https://cdn.discordapp.com/attachments/894612717434982423/894993577350950973/unknown.png")
        if(!interaction.member.permissions.has("ADMINISTRATOR")) {
            return interaction.followUp({ embeds: [noPermmisons] })
        }
        const subCommand = interaction.options.getSubcommand();
        const commandName = interaction.options.getString('command');
        const customCommand = await customCommandModel.findOne({ commandName });

        if(subCommand === 'create') {
            const response = interaction.options.getString('response');
            const properties = {
                commandName,
                response,
                guildId: interaction.guildId 
               }

            if(!customCommand) {
                await customCommandModel.create(properties);
            } else {
                await customCommand.update(properties);
            }

            await interaction.guild.commands.create({
                name: commandName,
                description: 'Custom Commands Powered By https://www.kvnn.net/'
            });

            const embed = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setTitle("Custom Commands")
            .addField('Name', commandName)
            .addField('Response', response)

            await interaction.followUp({ embeds: [embed] });
        } else if(subCommand === 'delete') {

            let embed2 = new MessageEmbed().setColor(errorColor).setFooter(footer)
            .setDescription(`${errorEmoji} | No Custom Command With That Name Exist In Your Guild Data`)

            if(!customCommand) interaction.followUp(
                { embeds:  [embed2] }
                );

            await customCommand.delete();

            const command = await interaction.guild.commands.cache.find(
                (cmd) => cmd.name === commandName
            );
            await interaction.guild.commands.delete(command.id);

            let embed3 = new MessageEmbed().setColor(sucsessColor).setFooter(footer)
            .setTitle(`Deleted`)
            .setDescription(`${sucsessEmoji} | Command Deleted`)

            interaction.followUp(
                {
                    embeds: [
                        embed3,
                    ],
                },
            );
        }
    }
}