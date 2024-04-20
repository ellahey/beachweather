/* Weather data from meteoserver.nl */

import axios from "axios";
export let place;
place = 'domburg'
let lat, long;
const APIkey = 'c839d9b335bda48cf2d4c3b2b4302d20';
const urlCoordinates = `http://api.openweathermap.org/geo/1.0/direct?q=${place}&appid=${APIkey}`
const urlWeather = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`

async function getCoordinates() {
    try {
        const coordinatesResponse = await axios.get(urlCoordinates);
        lat = coordinatesResponse.data[2]
        long = coordinatesResponse.data[3]
        console.log("This is the latitude: ", lat)
        return coordinatesResponse.data;
    } catch (error) {
        console.error("Error:", error);
        if (error.response && error.response.status) {
            console.log({error: error.response.statusText});
        } else {
            console.log({error: "Failed to fetch html"});
        }
        throw error; // Rethrow the error to propagate it
    }
}


/*http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
/*
if (typeof document !== 'undefined') {
    // will run in client's browser only
    place = document.querySelector("#locationsDropdown").innerText;
    console.log(place)
}*/
/*
document.addEventListener('DOMContentLoaded', function() {
    place = document.querySelector("#locationsDropdown").innerText;
});
*/

/*
place = 'domburg';
console.log(place)
const APIkey = 'b518a8038d';
const url = `https://data.meteoserver.nl/api/liveweer.php?locatie=${place}&key=${APIkey}`
*/


async function getWeather() {
    try {
        const weatherResponse = await axios.get(urlWeather);
        return weatherResponse.data;
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

export {getCoordinates, getWeather}
