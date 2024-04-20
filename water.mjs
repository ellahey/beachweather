
import axios from "axios";

export async function getWater(WATER_URL) {
    try {
        const response = await axios.get(WATER_URL);
        return response.data; // Return the actual data
    } catch (error) {
        console.error("Error fetching water data:", error);
        // Handle the error more gracefully or return null/undefined or an error object
        return { error: "Failed to fetch water data" };
    }
}
