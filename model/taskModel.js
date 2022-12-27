const mongoose = require("mongoose");

const taskModel = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    date: {
        type: Date,
        default: Date.now,
    },
})

const user = mongoose.model("user", taskModel);

module.exports = user;
``