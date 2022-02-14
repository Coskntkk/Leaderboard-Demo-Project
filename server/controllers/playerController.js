const Player = require("../models/Player");
const leaderboard = require("../models/Leaderboard");

// Get all players
exports.getAllPlayers = async (req, res) => {
    try {
        // Get all players
        const players = await Player.find({}).lean();

        // Paginate
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const currentPlayers = players.slice(startIndex, endIndex);

        // Return players
        res.status(200).json({
            status: "success",
            currentPlayers,
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
        let isAdmin = req.query.admin;
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
                dateJoined: player.dateJoined,
            };

            if (isAdmin) {
                // Redirect back
                res.redirect("back");
            } else {
                // Return response
                res.status(201).json({
                    status: "success",
                    player: playerData,
                });
            }
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
        const player = await Player.findOne({
            username: req.params.username,
        }).lean();
        if (!player) {
            res.status(404).json({
                status: "error",
                error: "Player not found.",
            });
        } else {
            // Return player
            res.status(200).json({
                status: "success",
                player,
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
        let player = await Player.findOne({
            username: req.params.username,
        }).lean();
        let isAdmin = req.query.admin;

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

            if (isAdmin) {
                // Redirect back
                res.redirect("back");
            } else {
                // Return response
                res.status(200).json({
                    status: "success",
                    player,
                });
            }
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
        let player = await Player.findOne({
            username: req.params.username,
        }).lean();
        let isAdmin = req.query.admin;

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

            if (isAdmin) {
                // Redirect back
                res.redirect("back");
            } else {
                // Return response
                res.status(200).json({
                    status: "success",
                    message: "Player deleted.",
                });
            }
        }
    } catch (err) {
        // Return error
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};
