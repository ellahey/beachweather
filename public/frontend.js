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
        .catch(error => console.error('Error fetching data:', error)
        );


    goButton.addEventListener('click', function () {
        let place = dropdown.value; // Get the selected value from the dropdown menu
        fetch('/api/coordinates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ place }) // Send the selected value in the request body
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(coordinates => {
                // Handle the response from the server if needed
                console.log('Coordinates:', coordinates);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
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



});
