import axios from 'axios';
import {logger} from './logger.mjs'
import req from 'express/lib/request.js';
import 'dotenv/config'

const APIkey = process.env.OPEN_WEATHER_KEY;
const urlCoordinates = `https://api.openweathermap.org/geo/1.0/direct`;
const urlWeather = `https://api.openweathermap.org/data/2.5/weather`;
let details;

async function getCoordinates(place) {
    try {
        const response = await axios.get(urlCoordinates, {
            params: {
                q: place,
                appid: APIkey
            }

        });
        logger.info(`Incoming request: ${req.method} ${req.url}`);
        const {lat, lon} = response.data[0];
        const coordArray = [lat, lon];
        console.log(`Latitude: ${lat}, Longitude: ${lon}`);
        return coordArray;
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
}

async function getWeather(coordinates) {
    try {
        const lat = coordinates[0];
        const lon = coordinates[1];
        const weatherResponse = await axios.get(urlWeather, {
            params: {
                lat,
                lon,
                appid: APIkey,
                units: 'metric'
            }
        });
        logger.info(`Incoming request: ${req.method} ${req.url}`);
        await parseDetails(weatherResponse);
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
}

async function parseDetails(weatherResponse) {
    const weatherData = weatherResponse.data;
    const weatherArray = Array.isArray(weatherData.weather) ? weatherData.weather : [];
    const mainData = weatherData.main || {};
    const windData = weatherData.wind || {};

    const cloudCover = weatherArray[0] ? weatherArray[0].description : undefined;
    const icon = weatherArray[0] ? weatherArray[0].icon : undefined;
    const currentTemp = mainData.temp;
    const feelsLike = mainData.feels_like;
    const minimumTemp = mainData.temp_min;
    const maxTemp = mainData.temp_max;
    const windSpeed = windData.speed;
    const windDirection = windData.deg;

    details = [
        cloudCover,
        icon,
        currentTemp,
        feelsLike,
        minimumTemp,
        maxTemp,
        windSpeed,
        windDirection
    ];
}

async function getDetails() {
    if (details.length > 0) {
        return details;
    }
}


export {getCoordinates, getWeather, getDetails};
