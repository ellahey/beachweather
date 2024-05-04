import express from "express";
import {getLocations} from './locations.mjs';
import {getCoordinates} from "./weather.mjs";

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public'));

app.get('/api/locations', async (req, res) => {
    try {
        const locations = await getLocations();
        res.json(locations);
    } catch (error) {
        // Log the error for server-side debugging
        console.error("Failed to fetch locations:", error);
        // Send a client-friendly error message and set an appropriate status code
        res.status(500).json({ message: "Failed to fetch locations. Please try again later." });
    }
});

app.get('/api/coordinates', async (req, res) => {
    try {
        const coordinates = await getCoordinates();
        res.json(coordinates);
    } catch (error) {
        console.error("Failed to fetch coordinates:", error);
        res.status(500).json({ message: "Failed to fetch coordinates. Please try again later." });
    }
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
