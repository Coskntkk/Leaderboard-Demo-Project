const express = require("express");
const cors = require('cors');

// Connect to MongoDB and create prize pool if not exists
const mongoConnect = require("./config/dbConfig");
mongoConnect();
const PrizePool = require("./models/PrizePool");
PrizePool.findOne({}, (err, pool) => {
    err ? console.log(err) : console.log(pool);
    if (!pool) {
        const prizePool = new PrizePool({
            money: 0,
        });
        prizePool.save();
    }
});

// Import the periodic tasks
const {
    updateLeaderboard,
    updateRanking, 
    resetLeaderboard
} = require("./utils/periodicTasks");

// Import the roters
const indexRouter = require("./routes/indexRoute");
const playersRouter = require("./routes/playersRoute");
const poolRouter = require("./routes/poolRoute");
const playRouter = require("./routes/playRoute");
const leaderboardRouter = require("./routes/leaderboardRoute");

const app = express();

// view engine setup
app.set("views", (__dirname + "views"));
app.set("view engine", "ejs");

// Express Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "public"));
app.use(cors())

// Routes
app.use("/", indexRouter);
app.use("/players", playersRouter);
app.use("/pool", poolRouter);
app.use("/play", playRouter);
app.use("/leaderboard", leaderboardRouter);

// Periodic Tasks
updateLeaderboard.start();
resetLeaderboard.start();
updateRanking.start();

// Run server
const port = process.env.PORT || 3010;
app.listen(port, function () {
    console.log(`Server is online at port ${port}.`);
});
