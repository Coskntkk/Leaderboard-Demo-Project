const mongoose = require("mongoose");
require("dotenv").config();
const dbUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/leaderboard";

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Connected to MongoDB");
})
const connection = mongoose.connection;

const mongoConnect = () => {
    connection.on("error", console.error.bind(console, "MongoDB connection error: "));
};

module.exports = mongoConnect;
