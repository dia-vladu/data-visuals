import { filterData, drawChart} from './drawChart.js';
import { drawBars } from './drawBars.js';
import { showBootstrapTooltip, hideBootstrapTooltip, throttle } from './tooltip.js';

let barList = [];
let throttleMouseMoveHandler;

function drawBarChart(objects, selectedOption, selectedIndicator, svg, width, height) {
    //svg.innerHTML = ""; // Clear previous SVG content

    // Filter the data based on selected indicator and option
    console.log('selected country: ', selectedIndicator);
    console.log('selected indicator: ', selectedOption);
    const data = filterData(objects, selectedOption, selectedIndicator);
    console.log('filtered data: ', data);

    drawChart(data, selectedOption, selectedIndicator, svg, width, height);

    barList = [];
    drawBars(data, svg, height, width, selectedIndicator, barList);
    console.log('barList: ', barList);
}

export function initializeBarChart(objects, svg, width, height, selector, buttons) {

    let selectedOptionBarChart = selector.options[selector.selectedIndex].text;
    let selectedIndicatorBarChart = document.querySelector("input[name='optiune_bc']:checked").value;

    // Draw the bar chart initially
    drawBarChart(objects, selectedOptionBarChart, selectedIndicatorBarChart, svg, width, height);

    // Add event listener for changes in the dropdown selector
    selector.addEventListener('change', () => {
        selectedOptionBarChart = selector.options[selector.selectedIndex].text;
        drawBarChart(objects, selectedOptionBarChart, selectedIndicatorBarChart, svg, width, height);
    });

    // Add event listeners for the radio buttons (indicator selection)
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.checked) {
                selectedOptionBarChart = selector.options[selector.selectedIndex].text;
                selectedIndicatorBarChart = button.value;
                drawBarChart(objects, selectedOptionBarChart, selectedIndicatorBarChart, svg, width, height);
            }
        });
    });

    // Mousemove event to show tooltip and update position
    svg.addEventListener('mousemove', throttleMouseMoveHandler = throttle((e) => {
        const mx = e.clientX - svg.getBoundingClientRect().x;
        const my = e.clientY - svg.getBoundingClientRect().y;

        let foundBar = null;
        
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

export function removeMouseHandlers(svg) {
    svg.removeEventListener('mousemove', throttleMouseMoveHandler);
    svg.removeEventListener('mouseleave', hideBootstrapTooltip);
}
