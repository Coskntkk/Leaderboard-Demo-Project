// Import modules
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create model
const prizePoolSchema = new Schema(
    {
        money: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { versionKey: false }
);

// Export model
module.exports = mongoose.model("PrizePool", prizePoolSchema);
