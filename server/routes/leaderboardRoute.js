// Import modules
const express = require("express");
const router = express.Router();
// Import controllers
const leaderboardController = require("../controllers/leaderboardController");

// .../leaderboard/:username?
router
    .route("/:username?")
    // Get leaderboard
    .get(leaderboardController.getLeaderboard);

router
    .route("/reset")
    // Reset leaderboard
    .get(leaderboardController.resetLeaderboard);

// Export router
module.exports = router;
