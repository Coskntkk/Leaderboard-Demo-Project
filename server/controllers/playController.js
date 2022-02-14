const Player = require("../models/Player");
const PrizePool = require("../models/PrizePool");
const leaderboard = require("../models/Leaderboard");
const taxPercent = require("../config/config").taxPercent;

exports.play = async (req, res) => {
    try {
        // Get player
        const player = await Player.findOne({
            username: req.body.username,
        }).lean();
        let isAdmin = req.query.admin;

        if (!player) {
            res.status(400).json({
                status: "error",
                error: "Player does not exist.",
            });
        } else {
            // Calculate tax and add to prize pool
            const rawMoney = req.body.money;
            const tax = rawMoney * taxPercent;
            const money = rawMoney - tax;

            // Get pool money and add tax to it
            const pool = await PrizePool.findOne({}).lean();
            const newPoolMoney = pool.money + tax;
            await PrizePool.updateOne({}, { money: newPoolMoney });

            // Get player money and add to it
            let playerRank = await leaderboard.find(player.username);
            let playerSocre = playerRank.score;
            playerSocre += money;
            await leaderboard.updateOne(player.username, playerSocre);

            if (isAdmin) {
                // If admin, return back
                res.redirect("back");
            } else {
                // Return response
                res.status(200).json({
                    status: "success",
                    player: player.username,
                    playerMoney: playerSocre,
                    tax: tax,
                    pool: newPoolMoney,
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
