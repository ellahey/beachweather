export function degreesToCompass(degrees) {
    const compassPoints = [
        "N", "NNE", "NE", "ENE",
        "E", "ESE", "SE", "SSE",
        "S", "SSW", "SW", "WSW",
        "W", "WNW", "NW", "NNW"
    ];

    // Make sure degrees are within the range [0, 360)
    degrees = (degrees + 360) % 360;

    // Calculate the index for the compass point
    const index = Math.floor((degrees + 11.25) / 22.5) % 16;

    return compassPoints[index];
}

// Example usage:
/*const windDirectionDegrees = 45; // Replace with your wind direction in degrees
const compassDirection = degreesToCompass(windDirectionDegrees);
console.log(`Wind direction: ${windDirectionDegrees}°, Compass direction: ${compassDirection}`);*/
