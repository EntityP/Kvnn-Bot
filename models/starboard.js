const mongoose = require("mongoose");

const starboardModel = mongoose.model(
    "starboards",
    new mongoose.Schema({
        Guild: String,
        starCount: Number,
        starboardChannel: String,
    })
);

module.exports = starboardModel;