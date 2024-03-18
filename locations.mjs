import axios from "axios";
import * as cheerio from 'cheerio';

async function getLocations() {
    try {
        const response = await axios.get('https://nl.wikipedia.org/wiki/Lijst_van_badplaatsen_in_Nederland');
        const html = response.data;
        const $ = cheerio.load(html);
        const listItems = $("ul li a[title]");
        let isInRange = false;
        const locations = [];

        listItems.each(function(i, el) {
            const title = $(this).attr("title").trim();

            if (title === "Ballum") {
                isInRange = true;
            }

            if (isInRange) {
                locations.push(title);
            }

            if (title === "Zoutelande") {
                isInRange = false;
                // Stop collecting after Zoutelande is encountered
                return false;
            }
        });

        // Print the locations array
        console.log(locations);

        return locations;
    } catch (error) {
        console.error("Error:", error);

        if (error.response && error.response.status) {
            // Handle specific error responses if needed
            console.log({ error: error.response.statusText });
        } else {
            console.log({ error: "Failed to fetch html" });
        }

        throw error; // Rethrow the error to propagate it
    }
}

export { getLocations };