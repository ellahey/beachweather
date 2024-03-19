// Function to populate the dropdown with locations
let place;
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

        // Add change listener to dropdown
        document.getElementById("locationsDropdown").addEventListener('change', function() {
            let selectedOption = this.options[this.selectedIndex]; // Get the selected option
            let place = selectedOption.value; // Get the value of the selected option
            alert("Selected place: " + place);
        });
    })
    .catch(error => console.error('Error fetching data:', error));
