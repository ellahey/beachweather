// server.js
import express from "express";
import { getCoordinates, getWeather } from "./weather.mjs";
import {getLocations} from "./locations.mjs";

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public'));

app.get('/api/locations', async (req, res) => {
    // Assuming you have a function to get locations
    try {
        const locations = await getLocations();
        res.json(locations);
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
    } catch (error) {
        console.error("Failed to fetch coordinates:", error);
        res.status(500).json({ message: "Failed to fetch coordinates. Please try again later." });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
