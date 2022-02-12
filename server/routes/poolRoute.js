const express = require("express");
const router = express.Router();
const poolController = require("../controllers/poolController");

/* GET users listing. */
router.route("/").get(poolController.getPoolPrize);

router.route("/:money").post(poolController.addPrizeToPool);

router.route("/reset").get(poolController.resetPoolPrize);

module.exports = router;
