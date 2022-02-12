const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prizePoolSchema = new Schema({
    money: {
        type: Number,
        required: true,
        default: 0,
    },
});

module.exports = mongoose.model("PrizePool", prizePoolSchema);
