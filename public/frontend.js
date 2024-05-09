document.addEventListener('DOMContentLoaded', function() {
    const dropdown = document.querySelector('#locationsDropdown');
    const goButton = document.querySelector("#getWeatherButton");

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
});
