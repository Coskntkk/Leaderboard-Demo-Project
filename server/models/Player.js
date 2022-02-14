// Import modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create model
const playerSchema = new Schema(
    {
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
        lastDayRanking: {
            type: Number,
            required: true,
            default: 0,
        },
        dateJoined: {
            type: Date,
            default: Date.now,
        },
        totalMoney: {
            type: Number,
            required: true,
            default: 0,
        }
    },
    { versionKey: false }
);

// Export model
module.exports = mongoose.model("Player", playerSchema);
