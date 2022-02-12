const express = require("express");
const router = express.Router();
const leaderboardController = require("../controllers/leaderboardController");

router.route("/:username?")
    .get(leaderboardController.getLeaderboard);

module.exports = router;
