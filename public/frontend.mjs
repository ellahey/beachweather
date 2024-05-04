

const dropdown = document.getElementById("locationsDropdown");

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

fetch('/api/coordinates')
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
    });


/*fetch('/api/weather')
    .then(response => response.json())
    .then(weather => {
        document.querySelector("#weatherData").innerHTML = weather.toString();
    })*/











