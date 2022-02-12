const leaderboard = require("../models/Leaderboard");
const Player = require("../models/Player");

exports.getLeaderboard = async (req, res) => {
    try {
        const username = req.params.username;
        const top100 = await leaderboard.top(100);

        // Merge top 100 players with their data
        const players = await Promise.all(
            top100.map(async (player) => {
                const playerData = await Player.findOne({ username: player.id});
                return {
                    ...player,
                    country: playerData.country,
                    lastDayRanking: playerData.lastDayRanking,
                };
            })
        );

        if (!username) {
            res.status(200).json({
                status: "success",
                top100: players,
                neighbours: [],
            });
        } else {
            const player = await Player.findOne({ username: username });
            const playerId = player._id;
            const playerRank = await leaderboard.find(playerId).rank;
            const neighbour = await leaderboard.list(
                playerRank - 3,
                playerRank + 2
            );

            // Merge top 100 players with their data
            const neighbours = await Promise.all(
                neighbour.map(async (player) => {
                    const playerData = await Player.findOne({ username: player.id});
                    return {
                        ...player,
                        country: playerData.country,
                        lastDayRanking: playerData.lastDayRanking,
                    };
                })
            );

            res.status(200).json({
                status: "success",
                top100: result,
                neighbours: neighbours,
            });
        }
    } catch (err) {
        res.status(500).json({ status: "error", error: err.message });
    }
};
