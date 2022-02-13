const express = require("express");
const router = express.Router();
const examples = require("../examples.json");
const Player = require("../models/Player");
const request = require("request");

// .../
router.get("/", function (req, res) {
    res.render("index");
});

router.get("/pop", (req, res) => {
    // Make post request all the example items
    examples.forEach((example) => {
        request.post({
            url:     'http://localhost:3010/players',
            body:    example,
            json:    true
        }, function(error, response, body){
            console.log(body);
        });
    });
});


module.exports = router;
