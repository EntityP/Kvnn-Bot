const { StarboardClient } = require("reconlx");
const client = require("../index");

const starboardclient = new StarboardClient({
    client: client,
})

module.exports = starboardclient;