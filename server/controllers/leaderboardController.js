const leaderboard = require("../models/Leaderboard");
const Player = require("../models/Player");

exports.getLeaderboard = async (req, res) => {
    try {
        // Get top 100 players
        const username = req.params.username;
        let top100 = await leaderboard.top(100);

        // Get arounds
        let arounds = [];
        // If username is provided
        if (username) {
            // Get player rank
            const playerRank = await leaderboard.rank(username);

            // If player is not in top 100, get arounds
            if (playerRank > 100) {
                arounds = await leaderboard.list(playerRank-3, playerRank+2);
            }
        }

        // Merge top 100 and arounds
        const result = top100.concat(arounds);
       
        // Merge players with their leaderboard data
        const playersWithLeaderboardData = await Promise.all(
            result.map(async (player) => {
                const playerData = await Player.findOne({ username: player.id }).lean();
                return {
                    ...player,
                    country: playerData.country,
                    lastDayRanking: playerData.lastDayRanking
                };
            })
        );

        res.status(200).json({ status: "success", leaderboard: playersWithLeaderboardData });

    } catch (err) {
        // Return error
        res.status(500).json({ status: "error", error: err.message });
    }
};

exports.resetLeaderboard = async (req, res) => {
    try {
        // Reset leaderboard
        await Promise.all(
            leaderboard.reset()
        );

        // Return success
        res.status(200).json({ status: "success", result });
    } catch (err) {
        // Return error
        res.status(500).json({ status: "error", error: err.message });
    }
}