const { CommandInteracion, Client, MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleinfo",
  description: "See information about a role",
  category: "Information",
  options: [
    {
      name: "role",
      type: "ROLE",
      description: "The role you want information about",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteracion} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {
    const role = interaction.options.data[0].role;

    let ishoist = role.hoist ? "Yes" : "No";
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
          name: `Hoisted`,
          value: `${ishoist}`,
          inline: true,
        },
        {
          name: "Mentionable",
          value: `${role.mentionable}`,
          inline: true,
        }
      );
    return await interaction.editReply({ embeds: [embed] });
  },
};