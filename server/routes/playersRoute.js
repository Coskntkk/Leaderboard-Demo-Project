// Import modules
const express = require("express");
const router = express.Router();
// Import controllers
const playerController = require("../controllers/playerController");

// .../players
router
    .route("/")
    // Get all players
    .get(playerController.getAllPlayers)
    // Create new player
    .post(playerController.createPlayer);

// .../players/:username
router
    .route("/:username")
    // Get player by username
    .get(playerController.getPlayerByUsername)
    // Update player by username
    .put(playerController.updatePlayer)
    // Delete player by username
    .delete(playerController.deletePlayer);

// Export router
module.exports = router;
