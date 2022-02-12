const express = require("express");
const router = express.Router();
const playController = require("../controllers/playController");

/* GET users listing. */
router.route("/:username/:money").get(playController.play);

module.exports = router;
