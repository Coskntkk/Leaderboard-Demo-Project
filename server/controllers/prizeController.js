// Import models
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
        const Pool = await PrizePool.findOne({}).lean();
        let isAdmin = req.query.admin;

        if (!Pool) {
            // If pool is not found, return error
            res.status(500).json({
                status: "error",
                error: "Prize pool error",
            });
        } else {
            // If pool is found, add prize
            let newMoney = Pool.money + money;
            await PrizePool.findOneAndUpdate(
                {},
                { money: newMoney },
                { new: true }
            );

            if (isAdmin) {
                // If admin, return back
                res.redirect("back");
            } else {
                // Return response
                res.status(200).json({
                    status: "success",
                    prize: Pool.money,
                });
            }
        }
    } catch (err) {
        // Return error
        res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
};

// Reset pool at the end of the week
exports.resetPoolPrize = async (req, res) => {
    try {
        // Get prize
        const Pool = await PrizePool.findOne({});
        let isAdmin = req.query.admin;

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

            if (isAdmin) {
                // If admin, return back
                res.redirect("back");
            } else {
                // Return response
                res.status(200).json({
                    status: "success",
                    prize: Pool.money,
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
