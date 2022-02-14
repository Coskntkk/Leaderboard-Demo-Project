// Import modules
const express = require("express");
const router = express.Router();
// Import controllers
const playController = require("../controllers/playController");

// .../play
router
    .route("/")
    // Give prize to a player
    .post(playController.play);

// Export router
module.exports = router;
