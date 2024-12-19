import { initializeBarChart, removeMouseHandlers } from './charts/drawBarChart.js';
import { countries, years, indicators } from './constants/constants.js';
import * as Data from './fetchData.js';
import { initializeLineChart } from './charts/drawLineChart.js';

let objects = [];

async function main() {
    try {

        // Reset default radio button selection
        document.getElementById("bar").checked = true;
        document.getElementById("PIB").checked = true;
        document.getElementById("default_option").selected = true;

        // Fetch and process data
        const fetchPromises = indicators.map(indicator =>
            Data.fetchData(Object.keys(countries), years, indicator)
                .then(data => {
                    console.log(data);
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
        console.log("objects: ", objects);

        let svg = document.getElementById('svg_bc')
        const width = svg.getAttribute('width');
        const height = svg.getAttribute('height');
        const selector = document.getElementById('select_bc');
        const buttons = document.querySelectorAll("input[name='optiune_bc']");

        // Initialize the default chart after data is ready
        initializeDefaultChart(svg, width, height, selector, buttons);

        // Add event listeners for chart type changes
        document.querySelectorAll("input[name='chart_type']").forEach((radio) => {
            radio.addEventListener("change", function () {
                const chartType = document.querySelector("input[name='chart_type']:checked").value;
                removeMouseHandlers(svg);
                console.log("SVG has been emptied.")

                if (chartType === "bar") {
                    initializeBarChart(objects, svg, width, height, selector, buttons);
                } else {
                    initializeLineChart(objects, svg, width, height, selector, buttons);
                }
            });
        });

    } catch (error) {
        console.error('Error during the data fetching or processing:', error);
    }
}

// Function to initialize the default chart
function initializeDefaultChart(svg, width, height, selector, buttons) {
    const chartType = document.querySelector("input[name='chart_type']:checked").value;

    if (chartType === "bar") {
        initializeBarChart(objects, svg, width, height, selector, buttons);
    } else {
        initializeLineChart(objects, svg, width, height, selector, buttons);
    }
}

// Run main function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', main);