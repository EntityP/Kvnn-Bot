const { CommandInteracion, Client, MessageEmbed, Message } = require("discord.js");

module.exports = {
  name: "roleinfo",
  description: "See information about a role",
  category: "Information",
  /**
   *
   * @param {Client} client
   * @param {Message} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    const role = interaction.mentions.roles.first();
    let hex = role.hexColor.split("").slice(1).join("");

    const embed = new MessageEmbed()
      .setColor(role.color)
      .setThumbnail(`https://singlecolorimage.com/get/${hex}/400x400`)
      .addFields(
        {
          name: "Mention & ID",
          value: `${role}\n\`${role.id}\``,
        },
        {
          name: "Name",
          value: role.name,
          inline: true,
        },
        {
          name: "Color",
          value: `${role.hexColor}`,
          inline: true,
        },
        {
          name: "Position",
          value: `${role.position}`,
        },
        {
          name: "Mentionable",
          value: `${role.mentionable}`,
          inline: true,
        }
      );
    return await interaction.reply({ embeds: [embed] });
  },
};