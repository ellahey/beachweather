/* Weather data from meteoserver.nl */
import axios from "axios";
export let place;

const APIkey = 'b518a8038d';
const url = `https://data.meteoserver.nl/api/liveweer.php?locatie=${place}&key=${APIkey}`

export async function getWeather() {
    try {
        const weatherData = await axios.get(url);
    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status) {
            console.log({ error: error.response.statusText });
        } else {
            console.log({ error: "Failed to fetch html" });
        }
        throw error; // Rethrow the error to propagate it
    }
}