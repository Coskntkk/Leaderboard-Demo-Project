const express = require("express");
const router = express.Router();
const playController = require("../controllers/playController");

// .../play
router
    .route("/")
    // Give prize to a player
    .post(playController.play);

module.exports = router;
