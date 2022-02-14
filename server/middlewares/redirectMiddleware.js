module.exports = (req, res, next) => {
    // If user is authenticated in the session, redirect to landing page
    if (!req.session.userID) {
        return res.redirect("/");
    }
    next();
};
