// Import modules
const express = require("express");
require("dotenv").config();
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const methodOverride = require("method-override");

// Connect to MongoDB and create prize pool if not exists
const mongoConnect = require("./config/dbConfig");
mongoConnect();
const PrizePool = require("./models/PrizePool");
PrizePool.findOne({}, (err, pool) => {
    if (!pool) {
        const prizePool = new PrizePool({
            money: 0,
        });
        prizePool.save();
    }
});

// Import the periodic tasks
const { updateRanking, resetLeaderboard } = require("./utils/periodicTasks");

// Import the roters
const indexRouter = require("./routes/indexRoute");
const playersRouter = require("./routes/playersRoute");
const prizeRouter = require("./routes/prizeRoute");
const playRouter = require("./routes/playRoute");
const leaderboardRouter = require("./routes/leaderboardRoute");

// Create the app
const app = express();
// view engine setup
app.set("view engine", "ejs");

// Express Middlewares
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

// Express Session
global.userIN = null;
app.use(
    session({
        secret: "panteon",
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    })
);
app.use("*", (req, res, next) => {
    userIN = req.session.userID;
    next();
});

// Periodic Tasks
resetLeaderboard.start();
updateRanking.start();

// Routes
app.use("/", indexRouter);
app.use("/players", playersRouter);
app.use("/prize", prizeRouter);
app.use("/play", playRouter);
app.use("/leaderboard", leaderboardRouter);

// Run server
const port = process.env.PORT || 3010;
app.listen(port, function () {
    console.log(`Server is online at port ${port}.`);
});
