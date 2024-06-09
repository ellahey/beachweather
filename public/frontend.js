document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('#locationsDropdown');
    const goButton = document.querySelector("#getWeatherButton");
    const weatherText = document.querySelector("#weatherText");
    const answerText = document.querySelector("#answerText");
    const KM_PER_HOUR = 3.6
    const input = `Given the weather conditions provided here, tell me if it is a good day to go to the beach. 
     Please be sure to give your detailed reasoning for your answer based on the specific conditions I have provided here:`


    fetch('/api/locations')
        .then(response => response.json())
        .then(locations => {
            // Populate dropdown with locations
            locations.forEach(location => {
                const option = document.createElement("option");
                option.value = location;
                option.text = location;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching locations:', error));

    goButton.addEventListener('click', function () {
        let place = dropdown.value; // Get the selected value from the dropdown menu
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
                                const cloudCoverElem = document.createElement("div");
                                cloudCoverElem.id = 'clouds'
                                cloudCoverElem.textContent = capitalize(details[0]);

                                const iconElem = document.getElementById("weather-icon")
                                iconElem.id = 'icon'
                                const icon = details[1];
                                if (icon) {
                                    iconElem.innerHTML = `<img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="weather icon">`;
                                }
                                const currentTempElem = document.createElement("div");
                                currentTempElem.id = 'current';
                                const currentTempCelcius = Math.trunc(details[2]);
                                currentTempElem.textContent = `Current Temperature: ${currentTempCelcius}°C`;

                                const feelsLikeElem = document.createElement("div");
                                feelsLikeElem.id = 'feels'
                                const feelsLike = Math.trunc(details[3]);
                                feelsLikeElem.textContent = `Feels Like: ${feelsLike}°C`;

                                const minTempElem = document.createElement("div");
                                minTempElem.id = 'min'
                                const minTemp = Math.trunc(details[4]);
                                minTempElem.textContent = `Minimum Temperature: ${minTemp}°C`;

                                const maxTempElem = document.createElement("div");
                                maxTempElem.id = 'max'
                                const maxTemp = Math.trunc(details[5]);
                                maxTempElem.textContent = `Maximum Temperature: ${maxTemp}°C`;

                                const windSpeedElem = document.createElement("div");
                                windSpeedElem.id = 'speed'
                                const windSpeed = Math.trunc(details[6]) * KM_PER_HOUR;
                                windSpeedElem.textContent = `Wind Speed: ${windSpeed} km/hr`;

                                const windDirectionElem = document.createElement("div");
                                windDirectionElem.id = 'dir';
                                const windDirection = degToCompass(details[7]);
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
                                const detailsArray =
                                    [cloudCoverElem.textContent,
                                        currentTempElem.textContent,
                                        feelsLikeElem.textContent,
                                        minTempElem.textContent,
                                        maxTempElem.textContent,
                                        windSpeedElem.textContent,
                                        windDirectionElem.textContent
                                    ]
                                const requestBody = {
                                    inputs: input + detailsArray.join(', ')
                                };

                                const requestBodyString = JSON.stringify(requestBody);
                                query(requestBodyString).then(
                                    answer => {
                                        const answerString = JSON.stringify(answer);
                                        const extractedValue = answer[0].generated_text;
                                        answerText.append(extractedValue);
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
});

    function degToCompass(num) {
        const val = Math.floor((num / 22.5) + 0.5);
        const arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    function capitalize(s) {
        return s && s[0].toUpperCase() + s.slice(1);
    }

    async function query(data) {
        const hf_token = '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';
        const response = await fetch(
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
        const result = await response.json();
        return result;
    }


