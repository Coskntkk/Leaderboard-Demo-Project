const PrizePool = require("../models/PrizePool");

// Get pool prize
exports.getPoolPrize = (req, res) => {
    try {
        const Pool = PrizePool.findOne({});
        if (!Pool) {
            res.status(500).json({
                status: "error",
                error: "Internal server error",
            });
        } else {
            res.status(200).json({
                status: "success",
                prize: Pool.money,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Add prize to pool
exports.addPrizeToPool = (req, res) => {
    try {
        const money = req.params.money;
        const Pool = PrizePool.findOne({});
        if (!Pool) {
            res.status(500).json({
                status: "error",
                error: "Internal server error",
            });
        } else {
            Pool.money += money;
            Pool.save();
            res.status(200).json({
                status: "success",
                prize: Pool.money,
            });
        }
    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err,
        });
    }
};

// Reset pool at the end of the week
exports.resetPoolPrize = (req, res) => {};
