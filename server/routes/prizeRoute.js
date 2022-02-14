const express = require("express");
const router = express.Router();
const prizeController = require("../controllers/prizeController");

// .../prize
router
    .route("/")
    // Get pool prize
    .get(prizeController.getPoolPrize)
    // Add prize to pool
    .post(prizeController.addPrizeToPool);

// .../prize/reset
router
    .route("/reset")
    // Reset prize pool
    .post(prizeController.resetPoolPrize);

module.exports = router;
