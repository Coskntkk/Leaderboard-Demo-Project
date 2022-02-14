// Import modules
const express = require("express");
const router = express.Router();
// Import controllers
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

// Export router
module.exports = router;
