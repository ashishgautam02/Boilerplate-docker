// Load environment variables
require('dotenv').config();

const express = require('express');
const redis = require('redis');

const app = express();

// Get Redis host and port from environment variables
const redisHost = process.env.REDIS_HOST || 'localhost';
const redisPort = process.env.REDIS_PORT || 6379;

// Create Redis client
const client = redis.createClient({
    socket: {
        host: redisHost,
        port: redisPort
    }
});

client.connect()
    .then(() => console.log(`Connected to Redis at ${redisHost}:${redisPort}`))
    .catch(err => console.error('Redis connection error:', err));

// Root route
app.get('/', async (req, res) => {
    try {
        // Increment counter
        const counter = await client.incr('hits');
        res.send(`This webpage has been viewed ${counter} time(s)`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error connecting to Redis');
    }
});

// Health route
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// Start server
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server running on http://0.0.0.0:${port}`);
});

