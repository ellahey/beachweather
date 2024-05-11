document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('#locationsDropdown');
    const goButton = document.querySelector("#getWeatherButton");

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
                        // Process weather response
                        /*console.log(response.json())*/
                        /*return response.json();*/
                    })
                    .then(weatherData => {
                     /*console.log(`Weather data: ${weatherData}`)//do something else with weatherData.
*/
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





/* fetch('/api/coordinates')
     .then(response => {
         if (!response.ok) {
             throw new Error('Network response was not ok');
         }
         return response.json();  // Ensure you return this
     })
     .then(coordinates => {
         const paragraph = document.querySelector("p.weather_text")
         paragraph.outerHTML = JSON.stringify(coordinates);  // Might need to adjust how you show coordinates
         document.body.appendChild(paragraph);  // Ensure you add it to the DOM
     })
     .catch(error => {
         console.error('Error fetching data:', error);
     });*/


