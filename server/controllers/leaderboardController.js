// Import models
const leaderboard = require("../models/Leaderboard");
const Player = require("../models/Player");

exports.getLeaderboard = async (req, res) => {
    try {
        // Get top 100 players
        const username = req.params.username;
        let result = await leaderboard.top(100);

        let userFound = true;
        // If username is provided
        if (username) {
            // Check if username exists
            let playerData = await Player.findOne({
                username: username,
            }).lean();
            if (!playerData) {
                userFound = false;
            } else {
                userFound = true;
            }

            // Get players rank
            let rank = await leaderboard.rank(username);

            // If player is not in top 100, get rank and arounds
            if (rank > 100) {
                let arounds = await leaderboard.list(rank - 3, rank + 2);
                result = [...result, ...arounds];
            }
        }

        // Get list of usernames
        const usernames = result.map((player) => player.id);
        const playersData = await Player.find({
            username: { $in: usernames },
        }).lean();

        // Merge players with their leaderboard data
        const leaderboardData = playersData
            .map((playerData) => {
                let leaderboardItem = result.find(
                    (player) => player.id === playerData.username
                );
                return {
                    ...leaderboardItem,
                    country: playerData.country,
                    lastDayRanking: playerData.lastDayRanking,
                };
            })
            .sort((a, b) => a.rank - b.rank);

        res.status(200).json({
            status: "success",
            leaderboard: leaderboardData,
            userFound,
        });
    } catch (err) {
        // Return error
        res.status(500).json({ status: "error", error: err.message });
    }
};

exports.resetLeaderboard = async (req, res) => {
    try {
        // Reset leaderboard
        await Promise.all(leaderboard.reset());

        // Return success
        res.status(200).json({ status: "success", result });
    } catch (err) {
        // Return error
        res.status(500).json({ status: "error", error: err.message });
    }
};
