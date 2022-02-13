const Player = require("../models/Player");
const leaderboard = require("../models/Leaderboard");

// Get all players
exports.getAllPlayers = async (req, res) => {
    try {
        // Get all players
        const players = await Player.find({}).lean();

        // Merge players with their leaderboard data
        const playersWithLeaderboardData = await Promise.all(
            players.map(async (player) => {
                const playerData = await leaderboard.find(player.username);
                return {
                    ...player,
                    money: playerData.score,
                    rank: playerData.rank,
                };
            })
        );

        // Return players
        res.status(200).json({
            status: "success",
            players: playersWithLeaderboardData,
        });

    } catch (err) {
        // Return error
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Create new player
exports.createPlayer = async (req, res) => {
    try {
        // Check if player exists
        let exists = await Player.findOne({ username: req.body.username });
        if (exists) {
            res.status(400).json({
                status: "error",
                error: "Player already exists.",
            });
        } else {
            // Create new player
            const player = await Player.create(req.body);

            // Add player to leaderboard
            await leaderboard.updateOne(player.username, 0);

            // Return player
            const playerData = {
                username: player.username,
                country: player.country,
                money: 0,
                rank: 0,
            };
            res.status(201).json({
                status: "success",
                player: playerData,
            });
        }
    } catch (err) {
        // Return error
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Get player by username
exports.getPlayerByUsername = async (req, res) => {
    try {
        // Check if player exists
        const player = await Player.findOne({ username: req.params.username }).lean();
        if (!player) {
            res.status(404).json({
                status: "error",
                error: "Player not found.",
            });
        } else {
            // Merge player with their leaderboard data
            const playerData = await leaderboard.find(player.username);
            const playerWithLeaderboardData = {
                ...player,
                money: playerData.score,
                rank: playerData.rank,
            };
            // Return player
            res.status(200).json({
                status: "success",
                player: playerWithLeaderboardData,
            });
        }
    } catch (err) {
        // Return error
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Update player
exports.updatePlayer = async (req, res) => {
    try {
        // Check if player exists
        let player = await Player.findOne({ username: req.params.username }).lean();

        if (!player) {
            res.status(400).json({
                status: "error",
                error: "Player not found.",
            });
        } else {
            // Update and get updated player
            player = await Player.findOneAndUpdate(
                { username: req.params.username },
                req.body,
                { new: true }
            ).lean();

            // Merge player with their leaderboard data
            const playerData = await leaderboard.find(player.username);
            await leaderboard.updateOne(player.username, playerData.score);
            const playerWithLeaderboardData = {
                ...player,
                money: playerData.score,
                rank: playerData.rank,
            };

            // Return player
            res.status(200).json({
                status: "success",
                player: playerWithLeaderboardData,
            });
        }

    } catch (err) {
        // Return error
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Delete player
exports.deletePlayer = async (req, res) => {
    try {
        // Check if player exists
        let player = await Player.findOne({ username: req.params.username }).lean();
        if (!player) {
            res.status(400).json({
                status: "error",
                error: "Player not found.",
            });
        } else {
            // Delete player
            await Player.deleteOne({ username: req.params.username });

            // Delete player from leaderboard
            await leaderboard.remove(player.username);

            // Return success
            res.status(200).json({
                status: "success",
                message: "Player deleted.",
            });
        }
    } catch (err) {
        // Return error
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};
