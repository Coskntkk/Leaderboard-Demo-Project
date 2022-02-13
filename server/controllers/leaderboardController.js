const leaderboard = require("../models/Leaderboard");
const Player = require("../models/Player");

exports.getLeaderboard = async (req, res) => {
    try {
        // Get top 100 players
        const username = req.params.username;
        console.log(username);
        const top100 = await leaderboard.top(100);

        // Get list of players' usernames
        const usernames = top100.map((player) => player.id);

        // Get list of players' data
        const players = await Player.find({ username: { $in: usernames } }).lean();

        // Merge players with their leaderboard data
        const playersWithLeaderboardData = await Promise.all(
            players.map(async (player) => {
                const playerData = await leaderboard.find(player.username);
                return {
                    ...player,
                    money: playerData.score,
                    rank: playerData.rank
                };
            })
        );

        playersWithLeaderboardData.sort((a, b) => a.rank - b.rank);

        if (!username) {
            // If username is not provided, return only top 100 players
            res.status(200).json({
                status: "success",
                top100: playersWithLeaderboardData,
                neighbours: [],
            });

        } else {
            // If username is provided, return top 100 players and neighbours
            const player = await Player.findOne({ username: username });
            const playerRank = await leaderboard.rank(player.username);
            console.log(playerRank);

            if (playerRank > 100) {
                // If player is not in top 100, return top 100 players and neighbours
                const neighbour = await leaderboard.list(
                    playerRank - 3,
                    playerRank + 2
                );

                
                // Merge players with their leaderboard data
                const neightborsWithLeaderboardData = await Promise.all(
                    neighbour.map(async (player) => {
                        const playerData = await leaderboard.find(player.username);
                        return {
                            ...player,
                            money: playerData.score,
                            rank: playerData.rank
                        };
                    })
                );

                res.status(200).json({
                    status: "success",
                    top100: result,
                    neighbours: neightborsWithLeaderboardData,
                });
            } else {
                // If player is in top 100, return only top 100 players
                res.status(200).json({
                    status: "success",
                    top100: players,
                    neighbours: [],
                });
            }
        }
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