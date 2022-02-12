const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

/* GET users listing. */
router
    .route("/")
    .get(playerController.getAllPlayers)
    .post(playerController.createPlayer);

router
    .route("/:username")
    .get(playerController.getPlayerByUsername)
    .put(playerController.updatePlayer)
    .delete(playerController.deletePlayer);

module.exports = router;
