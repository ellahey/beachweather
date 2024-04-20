

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

/*
fetch('/api/coordinates')
    .then(response => response.json())
    .then(coordinates => {
        console.log(coordinates)
    })

fetch('/api/weather')
    .then(response => response.json())
    .then(weather => {
        document.querySelector("#weatherData").innerHTML = weather.toString();
    })

*/









