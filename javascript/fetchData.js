import { baseUrl } from "./constants/constants.js";

export function buildString(prefix, items) {
    return items.map(item => `${prefix}=${item}`).join('');
}

export async function fetchData(countries, years, indicator) {
    const stringCountries = buildString('&geo', countries);
    const stringYears = buildString('&time', years);
    const url = `${baseUrl}${indicator}${stringCountries}${stringYears}`;

    try {
        const response = await fetch(url, { method: "get" });
        console.log('response: ', response);
        const data = await response.json();
        return Object.values(data.value);
    } catch (error) {
        console.error(`Error fetching data for ${indicator}:`, error);
        return [];
    }
}

export function processAndStoreData(indicator, data, years, countries, objects) {

    countries.forEach((country, countryIndex) => {
        years.forEach((year, yearIndex) => {
            const valueIndex = years.length * countryIndex + yearIndex;
            objects.push({
                "country": country,
                "year": year,
                "indicator": indicator,
                "value": data[valueIndex]
            });
        });
    });
}
