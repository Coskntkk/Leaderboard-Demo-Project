const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playerSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    country: {
        type: String,
        required: true,
    },
    money: {
        type: Number,
        required: true,
        default: 0,
    },
    lastDayRanking: {
        type: Number,
        required: true,
        default: 0,
    }
});

module.exports = mongoose.model("Player", playerSchema);
