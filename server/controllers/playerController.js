const Player = require("../models/Player");

// Get all players
exports.getAllPlayers = async (req, res) => {
    try {
        await Player.find()
            .then((players) => {
                res.status(200).json({
                    status: "success",
                    players: players,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    error: err,
                });
            });
    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Create new player
exports.createPlayer = async (req, res) => {
    try {
        const player = new Player({
            username: req.body.username,
            country: req.body.country,
            money: 0,
            lastDayRanking: 0,
            dailyDiff: 0,
        });

        await player
            .save()
            .then((player) => {
                res.status(200).json({
                    status: "success",
                    player: player,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    error: err,
                });
            });
    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Get player by username
exports.getPlayerByUsername = async (req, res) => {
    try {
        await Player.findOne({ username: req.params.username })
            .then((player) => {
                res.status(200).json({
                    status: "success",
                    player: player,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    error: err,
                });
            });
    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Update player
exports.updatePlayer = async (req, res) => {
    try {
        await Player.updateOne(
            { username: req.params.username },
            { $set: req.body }
        )
            .then((player) => {
                res.status(200).json({
                    status: "success",
                    player: player,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    error: err,
                });
            });
    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Delete player
exports.deletePlayer = async (req, res) => {
    try {
        await Player.deleteOne({ username: req.params.username })
            .then((player) => {
                res.status(200).json({
                    status: "success",
                    player: player,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    status: "error",
                    error: err,
                });
            });
    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};
