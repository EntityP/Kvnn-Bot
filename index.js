const { Client, Collection } = require("discord.js");

const client = new Client({
    intents: 32767,
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = require("./config.json");

// Initializing the project
require("./handler")(client);

const { Player } = require("discord-music-player");
const player = new Player(client, {
  leaveOnEmpty: false,
});
client.player = player

client.login(client.config.token);