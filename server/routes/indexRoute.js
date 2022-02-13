const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// .../
router.get("/", function (req, res) {
    res.render("index");
});

router.route("/admin")
    .get(adminController.getAdminPage);

module.exports = router;
