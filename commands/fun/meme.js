const { Client, MessageEmbed, Message } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
  name: "meme",
  description: "See Meme",
  aliases: ["mem"],
  permissions: ["SEND_MESSAGES"],
  /**
   *
   * @param {Client} client
   * @param {Message} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    const res = await fetch(`https://api.popcat.xyz/meme`);

    const json = await res.json();

    const Embed = new MessageEmbed()
      .setColor("RANDOM")
      .setURL(json.url)
      .setTitle(json.title)
      .setImage(json.image)
      .setFooter(`👍 ${json.upvotes || 0} | 💬 ${json.comments || 0}`)
      .setTimestamp();

    return interaction.reply({ embeds: [Embed] });
  },
};