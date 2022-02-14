// Import modules
const express = require("express");
const router = express.Router();
// Import middlewares
const redirectMiddleware = require("../middlewares/redirectMiddleware");
// Import controllers
const adminController = require("../controllers/adminController");

// .../
router.get("/", function (req, res) {
    res.render("index");
});

// .../admin
router
    .route("/admin")
    // Get admin page
    .get(redirectMiddleware, adminController.getAdminPage);

// .../admin/login
router
    .route("/admin/login")
    // Login
    .post(adminController.login);

// .../admin/logout
router
    .route("/admin/logout")
    // Logout
    .get(adminController.logout);

// Export router
module.exports = router;
