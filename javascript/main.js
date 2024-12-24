import { ChartManager } from "./charts/ChartManager.js";
import { resetSelections, fetchAndProcessData } from "./utils/utils.js";

async function main() {
    try {
        resetSelections();
        const objects = await fetchAndProcessData();

        const svg = document.getElementById('svg');
        const selector = document.getElementById('selector');
        const buttons = document.querySelectorAll("input[name='option']");

        const chartManager = new ChartManager(objects, svg, selector, buttons);
        chartManager.initializeChart();

        document.querySelectorAll("input[name='chart_type']").forEach((radio) => {
            radio.addEventListener("change", () => chartManager.initializeChart());
        });
    } catch (error) {
        console.error("Error during the data fetching or processing:", error);
    }
}

// Run main function on DOMContentLoaded
document.addEventListener('DOMContentLoaded', main);
