const client = require("../index");
const starboardClient = require("../client/starboard");

client.on("messageReactionAdd", (reaction) => {
    starboardClient.listener(reaction);
});

client.on("messageReactionRemove", (reaction) => {
    starboardClient.listener(reaction);
})