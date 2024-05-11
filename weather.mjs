// weather.mjs
import axios from "axios";
import {json} from "express";
import {nodeLength} from "jsdom/lib/jsdom/living/helpers/node.js";

const APIkey = 'c839d9b335bda48cf2d4c3b2b4302d20';
const urlCoordinates = `https://api.openweathermap.org/geo/1.0/direct`;
const urlWeather = `https://api.openweathermap.org/data/2.5/weather`;


let currentTemp, maxTemp, humidity, feelsLike, cloudCover, wind;
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

async function getWeather(coordinates) {
    console.log("Fetching weather")
    try {
        console.log("Coordinates:", coordinates); // Log coordinates
        const lat = coordinates[0];
        const lon = coordinates[1];
        const weatherResponse = await axios.get(urlWeather, {
            params: {
                lat,
                lon,
                appid: APIkey
            }
        });

        console.log('Response Data Property using stringify:', JSON.stringify(weatherResponse.data, null, 2));

// Logging specific data
       const weatherArray =  weatherResponse.data && weatherResponse.data.weather; // Safe access using && to avoid errors*/
        console.log(weatherArray)
       cloudCover = weatherArray[0].description
       console.log(cloudCover)

    } catch (error) {
        console.error("Error fetching weather:", error);
        throw error;
    }
}

export { getCoordinates, getWeather };
