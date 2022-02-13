const Player = require("../models/Player");

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

        // Return players
        res.render("admin", {
            players,
            page,
            totalPlayers,
            pages: Math.ceil(totalPlayers / playersPerPage),
        });
    } catch (err) {
        // Return error
        res.render("admin");
    }
};