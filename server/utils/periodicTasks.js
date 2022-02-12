const CronJob = require("cron").CronJob;
const Player = require("../models/Player");
const leaderboard = require("../models/Leaderboard");
const PrizePool = require("../models/PrizePool");

// Update leaderboard every minute
const updateLeaderboard = new CronJob(
    "0 * * * * *",
    async () => {
        try {

            // Get all players
            const players = await Player.find({});

            // Update all players
            players.forEach(async (player) => {
                await leaderboard.updateOne(player.username, player.money);
            });
            console.log("Leaderboard updated.");

        } catch (err) {
            // Return error
            console.log(err);
        }
    },
    null,
    true
);

// Update rankings every day
const updateRanking = new CronJob(
    "0 0 0 * * *",
    async () => {
        try {
            // Set all users lastDayRanking to current ranking
            const players = await Player.find({});
            players.forEach(async (player) => {
                player.lastDayRanking = await leaderboard.rank(player.username);
                await player.save();
            });
            console.log("Ranking updated.");

        } catch (err) {
            // Return error
            console.log(err);
        }
    },
    null,
    true
);

// Reset leaderboard every sunday midnight
const resetLeaderboard = new CronJob(
    "0 0 0 * * 1",
    async () => {
        try {
            // Get total prize pool
            const prizePool = await PrizePool.findOne({});
            const totalMoney = prizePool.money;

            // Get prizes
            const firstPrize = totalMoney * 0.2;
            const secondPrize = totalMoney * 0.15;
            const thirdPrize = totalMoney * 0.1;
            const regularPrize = (totalMoney * 0.55) / 97;

            // Get top 100 players
            const top100 = await leaderboard.top(100);

            // Give prizes to top 100 players
            top100.forEach(async (player) => {
                if (player.rank === 1) {
                    await Player.findByIdAndUpdate(player.id, {
                        $inc: { money: money + firstPrize },
                    });
                } else if (player.rank === 2) {
                    await Player.findByIdAndUpdate(player.id, {
                        $inc: { money: money + secondPrize },
                    });
                } else if (player.rank === 3) {
                    await Player.findByIdAndUpdate(player.id, {
                        $inc: { money: money + thirdPrize },
                    });
                } else {
                    await Player.findByIdAndUpdate(player.id, {
                        $inc: { money: money + regularPrize },
                    });
                }
            });

            // Reset prize pool
            prizePool.money = 0;
            await prizePool.save();
            console.log("Leaderboard reset.");

        } catch (err) {
            // Return error
            console.log(err);
        }
    },
    null,
    true
);

module.exports = { updateLeaderboard, updateRanking, resetLeaderboard };
