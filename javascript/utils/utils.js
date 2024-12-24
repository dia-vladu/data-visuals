import { countries, indicatorMap, indicators, years } from "../constants/constants.js";
import * as Data from '../fetchData.js';

export function resetSelections() {
    document.getElementById("bar").checked = true;
    document.getElementById("PIB").checked = true;
    document.getElementById("default_option").selected = true;
}

export async function fetchAndProcessData() {
    const objects = [];

    const fetchPromises = indicators.map((indicator) =>
        Data.fetchData(Object.keys(countries), years, indicatorMap[indicator])
            .then(data => {
                if (data.length > 0) {
                    Data.processAndStoreData(indicator, data, years, Object.keys(countries), objects);
                }
            })
            .catch(err => {
                console.error(`Error fetching data for indicator: ${indicator}`, err);
            })
    );

    // Wait for all data to be fetched and processed
    await Promise.all(fetchPromises);

    return objects;
}