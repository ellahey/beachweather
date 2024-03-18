import express from "express";
const app = express();
const port = 3000;
import {getLocations} from './locations.mjs';

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/data', (req, res) => {
    res.json({ message: "This is data from the backend." });
});

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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
