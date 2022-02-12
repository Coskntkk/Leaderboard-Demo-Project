const Player = require("../models/Player");
const PrizePool = require("../models/PrizePool");
const taxPercent = 2;

exports.play = async (req, res) => {
    try {
        const username = req.params.username;
        console.log(username);
        const moneyRaw = parseInt(req.params.money);
        console.log(moneyRaw);
        const player = await Player.findOne({ username });
        const pool = await PrizePool.findOne({});

        // Check errors
        if (!player) {
            res.status(500).json({
                status: "error",
                error: "Player not found",
            });
        }
        if (!pool) {
            res.status(500).json({
                status: "error",
                error: "Pool error",
            });
        }
        if (!moneyRaw) {
            res.status(500).json({
                status: "error",
                error: "Money not found",
            });
        }

        // Calculate tax
        const tax = (moneyRaw / 100) * taxPercent;
        const moneyWoutTax = moneyRaw - tax;

        // Add money to player
        player.money += moneyWoutTax;
        await player.save();

        // Add tax to pool
        pool.money += tax;
        await pool.save();

        // Return response
        res.status(200).json({
            status: "success",
            player: player,
            pool: pool,
        });
    } catch (err) {
        // Return error
        res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
};
