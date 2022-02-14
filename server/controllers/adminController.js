// Import modules
require("dotenv").config();
// Import models
const Player = require("../models/Player");
const PrizePool = require("../models/PrizePool");

// Gets admin page
exports.getAdminPage = async (req, res) => {
    try {
        // Get page
        const page = parseInt(req.query.page) || 1;
        const playersPerPage = 25;
        const totalPlayers = await Player.countDocuments();

        // Get players depending on page number
        const players = await Player.find()
            .skip((page - 1) * playersPerPage)
            .limit(playersPerPage);

        // Get current prize
        let prizePool = await PrizePool.findOne({}).lean();
        let prize = prizePool.money;

        // Return players
        res.render("admin", {
            players,
            page,
            totalPlayers,
            pages: Math.ceil(totalPlayers / playersPerPage),
            prize,
        });
    } catch (err) {
        // Return error
        res.render("admin");
    }
};

// Logins admin user
exports.login = (req, res) => {
    try {
        const { username, password } = req.body;
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Check if username and password are correct
        if (username === adminUsername && password === adminPassword) {
            // Set session
            req.session.userID = username;
            res.redirect("/admin");
        } else {
            // Redirect to login page
            res.redirect("/");
        }
    } catch (error) {
        // If error, redirect to same page
        res.status(400).redirect("back");
    }
};

// Logouts admin user
exports.logout = (req, res) => {
    try {
        // Clear session
        req.session.destroy();
        res.redirect("/");
    } catch (error) {
        // If error, redirect to same page
        res.status(400).redirect("back");
    }
};
