// weather.mjs
import axios from "axios";

const APIkey = 'c839d9b335bda48cf2d4c3b2b4302d20';
const urlCoordinates = `https://api.openweathermap.org/geo/1.0/direct`;
/*const urlWeather = `https://api.openweathermap.org/data/3.0/onecall`;*/

async function getCoordinates(place) {
    console.log("Fetching coordinates for place:", place);
    try {
        const response = await axios.get(urlCoordinates, {
            params: {
                q: place,
                appid: APIkey
            }
        });
        const { lat, lon } = response.data[0];
        const coordArray = [lat, lon];
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        return coordArray;
    } catch (error) {
        console.error("Error fetching coordinates:", error);
        throw error;
    }
}
/*

async function getWeather(lat, lon) {
    try {
        const weatherResponse = await axios.get(urlWeather, {
            params: {
                lat,
                lon,
                appid: APIkey
            }
        });
        return weatherResponse.data;
    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}
*/

export { getCoordinates };
