// Import modules
const CronJob = require("cron").CronJob;

// Import models
const Player = require("../models/Player");
const leaderboard = require("../models/Leaderboard");
const PrizePool = require("../models/PrizePool");

// Update rankings every day
const updateRanking = new CronJob(
    "0 0 0 * * *",
    async () => {
        try {
            // Set all users lastDayRanking to current ranking
            const players = await Player.find({}).lean();
            players.map(async (player) => {
                let leaderboardPlayer = await leaderboard.find(player.username);
                const newPlayer = await Player.findByIdAndUpdate(player._id, {
                    lastDayRanking: leaderboardPlayer.rank,
                });
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

            const getPrize = (rank) => {
                if (rank === 1) {
                    return 0.2 * totalMoney;
                } else if (rank === 2) {
                    return 0.15 * totalMoney;
                } else if (rank === 3) {
                    return 0.1 * totalMoney;
                } else {
                    let rankCount = 100 - 4 + 1;
                    let sumRanks = ((4 + 100) / 2) * rankCount;
                    let remainingMoney = (totalMoney / 100) * 55;
                    let percent = (remainingMoney / sumRanks) * (104 - rank);
                    return percent;
                }
            };

            // Get top 100 players
            const top100 = await leaderboard.top(100);
            // Give prizes to top 100 players
            top100.map(async (player) => {
                let newMoney = player.score + getPrize(player.rank);
                await leaderboard.updateOne(player.id, newMoney, "replace");
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

module.exports = { updateRanking, resetLeaderboard };
