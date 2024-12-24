import { filterData, drawChart } from './drawChart.js';
import { drawBars } from './drawBars.js';
import { showBootstrapTooltip, hideBootstrapTooltip, throttle } from './tooltip.js';

let barList = [];
let throttleMouseMoveHandler;

function drawBarChart(objects, selectedCountry, selectedIndicator, svg, width, height) {
    // Filter the data based on selected indicator and option
    const data = filterData(objects, selectedCountry, selectedIndicator);

    drawChart(data, selectedCountry, selectedIndicator, svg, width, height);

    barList = [];
    drawBars(data, svg, height, width, selectedIndicator, barList);
}

export function initializeBarChart(objects, svg, width, height, selectedIndicator, selectedCountry, selector, buttons) {
    // Draw the bar chart initially
    drawBarChart(objects, selectedIndicator, selectedCountry, svg, width, height);

    // Event listener for changes in the dropdown selector
    const onSelectorChange = () => {
        selectedIndicator = selector.options[selector.selectedIndex].text;
        drawBarChart(objects, selectedIndicator, selectedCountry, svg, width, height);
    };

    // Event listener for radio button changes (indicator selection)
    const onButtonClick = (e) => {
        if (e.target.checked) {
            selectedCountry = e.target.value;
            drawBarChart(objects, selectedIndicator, selectedCountry, svg, width, height);
        }
    };

    // Attach event listeners
    selector.addEventListener('change', onSelectorChange);
    buttons.forEach(button => button.addEventListener('click', onButtonClick));

    // Store cleanup function to remove event listeners when switching chart types
    svg.barChartListeners = () => {
        selector.removeEventListener('change', onSelectorChange);
        buttons.forEach(button => button.removeEventListener('click', onButtonClick));
    };

    // Mousemove event to show tooltip and update position
    svg.addEventListener('mousemove', throttleMouseMoveHandler = throttle((e) => {
        const mx = e.clientX - svg.getBoundingClientRect().x;
        const my = e.clientY - svg.getBoundingClientRect().y;

        let foundBar = null;
        
        // Check if mouse is over any bar
        for (let item of barList) {
            if (mx >= item.xi && mx <= item.xi + item.wi && my >= item.yi && my <= item.yi + item.hi) {
                foundBar = item;
                break;
            }
        }

        if (foundBar) {
            showBootstrapTooltip(e.clientX, e.clientY, foundBar);
        } else {
            hideBootstrapTooltip();
        }
    }, 50));

    // Hide tooltip when mouse leaves the SVG
    svg.addEventListener('mouseleave', hideBootstrapTooltip);
}

export function removeMouseHandlersBarChart(svg) {
    // Cleanup event listeners when switching to another chart
    if (svg.barChartListeners) {
        svg.barChartListeners();
    }

    // Remove the mousemove event handler
    svg.removeEventListener('mousemove', throttleMouseMoveHandler);
    svg.removeEventListener('mouseleave', hideBootstrapTooltip);

    barList = [];
}
