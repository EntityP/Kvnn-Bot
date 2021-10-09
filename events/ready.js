const client = require('../index');
const starboardClient = require("../client/starboard");
const starboardModel = require("../models/starboard");
const path = require('path');
const express = require("express");
client.on('ready', async () => {
    client.user.setActivity(`https://www.kvnn.net/`, {
        type: "LISTENING"
    })
    console.log(`${client.user.tag} is now online!`);

    const data = await starboardModel.find();

    starboardClient.config.guilds.set(
        data.map((x) => {
            return {
                id: x.Guild,
                options: {
                    starCount: x.starCount,
                    starboardChannel: x.starboardChannel,
                }
            }
        })
    )

});