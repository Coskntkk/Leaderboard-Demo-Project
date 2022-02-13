const PrizePool = require("../models/PrizePool");

// Get pool prize
exports.getPoolPrize = async (req, res) => {
    try {
        // Get pool prize
        const Pool = await PrizePool.findOne({}).lean();
        if (!Pool) {
            // If pool is not found, return error
            res.status(500).json({
                status: "error",
                error: "Prize pool error",
            });
        } else {
            // If pool is found, return prize
            res.status(200).json({
                status: "success",
                prize: Pool.money,
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

// Add prize to pool
exports.addPrizeToPool = async (req, res) => {
    try {
        // Get money and prize
        const money = parseInt(req.body.money);
        const Pool = await PrizePool.findOne({})

        if (!Pool) {
            // If pool is not found, return error
            res.status(500).json({
                status: "error",
                error: "Prize pool error",
            });
        } else {
            // If pool is found, add prize
            Pool.money += money;
            Pool.save();

            // Return response
            res.status(200).json({
                status: "success",
                prize: Pool.money,
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

// Reset pool at the end of the week
exports.resetPoolPrize = async (req, res) => {
    try {
        // Get prize
        const Pool = await PrizePool.findOne({})
        if (!Pool) {
            // If pool is not found, return error
            res.status(500).json({
                status: "error",
                error: "Prize pool error",
            });
        } else {
            // If pool is found, set prize to 0
            Pool.money = 0;
            Pool.save();

            // Return response
            res.status(200).json({
                status: "success",
                prize: Pool.money,
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
