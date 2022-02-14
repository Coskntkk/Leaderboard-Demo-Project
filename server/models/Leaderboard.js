// Import modules
const client = require("../config/redisConfig");
const { Leaderboard } = require("redis-rank");

// Create model
const leaderboard = new Leaderboard(client, "lb:leaderboard", {
    sortPolicy: "high-to-low",
    updatePolicy: "best",
});

// Export model
module.exports = leaderboard;
