
/*import express from "express";
import {getCoordinates, getWeather, parseDetails} from "./weather.mjs";
import {getLocations} from "./locations.mjs";

const app = express();
const port = 3000;
let weather;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public'));*/
/*

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

app.post('/api/weather', async (req, res) => {
    try {
        console.log("Fetch request reaches server (weather endpoint)")
        const { coordinates } = req.body;
        weather = await getWeather(coordinates);
        res.json(weather);
    } catch (error) {
        console.error("Failed to fetch weather:", error);
        res.status(500).json({ message: "Failed to fetch weather. Please try again later." });
    }
});

app.post('/api/details', async (req, res) => {
    try {
        const { lat, lon } = req.query; // Assuming lat and lon are passed as query parameters
        const weatherData = await getWeather(lat, lon); // Ensure weather data is fetched first
        const details = await parseDetails(weatherData);
        res.json(details);
    } catch (error) {
        console.error("Failed to fetch weather details:", error);
        res.status(500).json({ message: "Failed to fetch weather details. Please try again later." });
    }
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
*/
import express from "express";
import {getCoordinates, getDetails, getWeather} from "./weather.mjs";
import { getLocations } from "./locations.mjs";

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public'));

app.get('/api/locations', async (req, res) => {
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

app.post('/api/weather', async (req, res) => {
    try {
        const { coordinates } = req.body;
        const weatherData = await getWeather(coordinates);
        res.json(weatherData);
    } catch (error) {
        console.error("Failed to fetch weather:", error);
        res.status(500).json({ message: "Failed to fetch weather. Please try again later." });
    }
});

app.get('/api/details', async (req, res) => {
    try {
        const details = await getDetails();
        res.json(details);
    } catch (error) {
        console.error("Failed to fetch weather details:", error);
        res.status(500).json({ message: "Failed to fetch weather details. Please try again later." });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});