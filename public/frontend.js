
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('#locationsDropdown');
    const goButton = document.querySelector("#getWeatherButton");
    let weatherText = document.querySelector("#weatherText");
    let answerText = document.querySelector("#answerText");
    const KM_PER_HOUR = 3.6
    const input = `Given the weather conditions provided here, tell me if it is a good day to go to the beach. 
     Please be sure to give your detailed reasoning for your answer based on the specific conditions I have provided here:`


    fetch('/api/locations')
        .then(response => response.json())
        .then(locations => {
            // Populate dropdown with locations
            locations.forEach((location) => {
                if (location.includes('(')) {
                    location = location.replace(/ \([\s\S]*?\)/g, "");
                }
                const option = document.createElement("option");
                option.value = location;
                option.text = location;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching locations:', error));

    goButton.addEventListener('click', function (node, child) {
        let place = '';
        place = dropdown.value; // Get the selected value from the dropdown menu
        fetch('/api/coordinates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({place}) // Send the selected value in the request body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(coordinates => {
                fetch('/api/weather', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({coordinates}) // Stringify coordinates before sending
                })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        fetch(`/api/details`)
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok');
                                }
                                return response.json();
                            })
                            .then(details => {
                                /*clear previous data*/
                                weatherText.innerHTML = '';
                                // Create elements for each detail and append them
                                let cloudCoverElem = document.createElement("div");
                                cloudCoverElem.id = 'clouds'
                                cloudCoverElem.textContent = capitalize(details[0]);

                                let iconElem = document.getElementById("weather-icon");
                                let icon = details[1];
                                if (iconElem) {
                                    iconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">`;
                                } else {
                                    iconElem = document.createElement("div");
                                    iconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">`;

                                }
                                let currentTempElem = document.createElement("div");
                                currentTempElem.id = 'current';
                                let currentTempCelcius = Math.trunc(details[2]);
                                currentTempElem.textContent = `Current Temperature: ${currentTempCelcius}°C`;

                                let feelsLikeElem = document.createElement("div");
                                feelsLikeElem.id = 'feels'
                                let feelsLike = Math.trunc(details[3]);
                                feelsLikeElem.textContent = `Feels Like: ${feelsLike}°C`;

                                let minTempElem = document.createElement("div");
                                minTempElem.id = 'min'
                                let minTemp = Math.trunc(details[4]);
                                minTempElem.textContent = `Minimum Temperature: ${minTemp}°C`;

                                let maxTempElem = document.createElement("div");
                                maxTempElem.id = 'max'
                                let maxTemp = Math.trunc(details[5]);
                                maxTempElem.textContent = `Maximum Temperature: ${maxTemp}°C`;

                                let windSpeedElem = document.createElement("div");
                                windSpeedElem.id = 'speed'
                                let windSpeed = Math.trunc(details[6]) * KM_PER_HOUR;
                                windSpeedElem.textContent = `Wind Speed: ${windSpeed} km/hr`;

                                let windDirectionElem = document.createElement("div");
                                windDirectionElem.id = 'dir';
                                let windDirection = degToCompass(details[7]);
                                windDirectionElem.textContent = `Wind Direction: ${windDirection}`;

                                weatherText.append(
                                    cloudCoverElem,
                                    iconElem,
                                    currentTempElem,
                                    feelsLikeElem,
                                    minTempElem,
                                    maxTempElem,
                                    windSpeedElem,
                                    windDirectionElem
                                );
                                let detailsArray =
                                    [cloudCoverElem.textContent,
                                        currentTempElem.textContent,
                                        feelsLikeElem.textContent,
                                        minTempElem.textContent,
                                        maxTempElem.textContent,
                                        windSpeedElem.textContent,
                                        windDirectionElem.textContent
                                    ]
                                let requestBody = {
                                    inputs: input + detailsArray.join(', ')
                                };

                                let requestBodyString = JSON.stringify(requestBody);
                                query(requestBodyString).then(
                                    answer => {
                                        let extractedValue = answer[0].generated_text;
                                            answerText.innerHTML = extractedValue;

                                    }
                                ).catch(error => {
                                    console.error('Error fetching answer:', error);
                                })
                                    .catch(error => {
                                        console.error('Error fetching weather details:', error);
                                    });
                            })
                            .catch(error => {
                                console.error('Error fetching weather:', error);
                            });
                    })
                    .catch(error => {
                        console.error('Error fetching coordinates:', error);
                    });
            });
    });
    const menuToggle = document.querySelector('#menu-toggle');
    const menu = document.querySelector('.menu');

    menu.addEventListener('click', function () {
        menuToggle.checked = false;
    });

    if (menuToggle.checked) {
        window.addEventListener("click", hideMenu);
        hideMenu();
    }

});
function hideMenu(){
    document.querySelector('#menu-toggle').checked = false;
}

function degToCompass(num) {
    let val = Math.floor((num / 22.5) + 0.5);
    let arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}

function capitalize(s) {
    return s && s[0].toUpperCase() + s.slice(1);
}

async function query(data) {
    const hf_token = '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';
    let response = await fetch(
        "https://api-inference.huggingface.co/models/google/flan-t5-xxl",
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${hf_token}`
            },
            method: "POST",
            body: data,
        }
    );
    return await response.json();
}



