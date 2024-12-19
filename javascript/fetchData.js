export function buildString(prefix, items) {
    return items.map(item => `${prefix}=${item}`).join('');
}

export async function fetchData(countries, years, indicator) {
    const stringCountries = buildString('&geo', countries);
    const stringYears = buildString('&time', years);
    const url = `https://ec.europa.eu/eurostat/api/dissemination/statistics/1.0/data/${indicator}${stringCountries}${stringYears}`;

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

export function getIndicatorCode(indicator) {
    const indicatorMap = {
        'demo_mlexpec?sex=T&age=Y1': 'SV',
        'demo_pjan?sex=T&age=TOTAL': 'POP',
        'sdg_08_10?na_item=B1GQ&unit=CLV10_EUR_HAB': 'PIB'
    };
    return indicatorMap[indicator] || '';
}

export function processAndStoreData(indicator, data, years, countries, objects) {
    const indicatorCode = getIndicatorCode(indicator);

    countries.forEach((country, countryIndex) => {
        years.forEach((year, yearIndex) => {
            const valueIndex = 15 * countryIndex + yearIndex;
            objects.push({
                "country": country,
                "year": year,
                "indicator": indicatorCode,
                "value": data[valueIndex]
            });
        });
    });
}

