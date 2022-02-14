// Import modules
require("dotenv").config();
const Redis = require("ioredis");

// Configure Redis
const client = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
});
client.on("connect", () => {
    console.log("Redis connected");
});

// Export client
module.exports = client;
