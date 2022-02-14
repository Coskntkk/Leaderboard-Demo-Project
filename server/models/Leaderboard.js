const client = require("../config/redisConfig");
const { Leaderboard } = require("redis-rank");

const leaderboard = new Leaderboard(client, "lb:leaderboard", {
    sortPolicy: "high-to-low",
    updatePolicy: "best",
});

module.exports = leaderboard;
