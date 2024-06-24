import express from "express";
import {logger} from "./logger.mjs";
import {getCoordinates, getDetails, getWeather} from "./weather.mjs";
import {getLocations} from "./locations.mjs";
import {callOpenAI} from "./public/chat.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    logger.info(`Incoming request: ${req.method} ${req.url}`);
    next();
});

app.get('/api/locations', async (req, res) => {
    try {
        const locations = await getLocations();
        res.json(locations);
        logger.info(`Incoming request: ${req.method} ${req.url}`)
    } catch (error) {
        console.error("Failed to fetch locations:", error);
        res.status(500).json({ message: "Failed to fetch locations. Please try again later." });
    }
});

app.post('/api/coordinates', async (req, res) => {
    try {
        const { place } = req.body;
        const coordinates = await getCoordinates(place);
        res.json(coordinates);
        logger.info(`Incoming request: ${req.method} ${req.url}`)
    } catch (error) {
        console.error("Failed to fetch coordinates:", error);
        res.status(500).json({ message: "Failed to fetch coordinates. Please try again later." });
    }
});

app.post('/api/weather', async (req, res) => {
    try {
        const { coordinates } = req.body;
        const weatherData = await getWeather(coordinates);
        res.json(weatherData);
        logger.info(`Incoming request: ${req.method} ${req.url}`)
    } catch (error) {
        console.error("Failed to fetch weather:", error);
        res.status(500).json({ message: "Failed to fetch weather. Please try again later." });
    }
});

app.get('/api/details', async (req, res) => {
    try {
        const details = await getDetails();
        res.json(details);
        logger.info(`Incoming request: ${req.method} ${req.url}`)
    } catch (error) {
        console.error("Failed to fetch weather details:", error);
        res.status(500).json({ message: "Failed to fetch weather details. Please try again later." });
    }
});

app.post('/api/chat', async (req, res) => {
    try {
        let weather = req.body
        const answer = await callOpenAI(weather)
        logger.info(`Incoming request: ${req.method} ${req.url}`)
        return res.json(answer)
    } catch (error) {
        console.error("Failed to fetch weather details:", error);
        res.status(500).json({ message: "Failed to fetch weather details. Please try again later." });
    }
});

//To handle frontent logs:
// Example route to handle frontend logs
app.post('/api/log', (req, res) => {
    const { level, message } = req.body;
    logger.log({ level, message });
    res.status(200).send('Log received');
});

app.listen(port, () => {
    logger.info(`Server is running on port ${port}`);
});