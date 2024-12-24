import { filterData, drawChart } from "./drawChart.js";
import { setElementColor } from "../utils/colorUtils.js";
import { showBootstrapTooltip, hideBootstrapTooltip, throttle } from './tooltip.js';

let throttleMouseMoveHandler;
let parsedPoints = [];

function populatePoints(data, width, height) {
    let n = data.length;
    width = (width - 50) / n;

    // Calculate max and min values
    const values = data.map(item => item.value);
    let maxi = Math.max(...values);
    let mini = Math.min(...values);

    // Scale values if necessary
    const scale = maxi >= 1000000 ? 1000000 : maxi >= 1000 ? 1000 : 1;
    maxi /= scale;
    mini /= scale;

    // Precompute constants to avoid recalculating in the loop
    const widthOffset = 0.1 * width;
    const heightFactor = (height - 60) / (Math.ceil(maxi) - Math.floor(mini));

    // Map points
    const points = data.map((item, i) => {
        const aux = item.value / scale;
        const xi = i * width + widthOffset + 50; // Horizontal position
        const yi = height - 30 - heightFactor * (aux - Math.floor(mini)); // Vertical position
        return { xi, yi };
    });

    parsedPoints = points;

    // Convert points to a string representation
    const pointString = points.map(point => `${point.xi},${point.yi}`).join(' ');

    return pointString;
}

function drawPolyLine(pointString, selectedIndicator, svg) {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    line.setAttribute('points', pointString);
    line.setAttribute('fill', 'none');
    setElementColor(line, selectedIndicator);
    line.setAttribute('stroke-width', 3);
    line.setAttribute('stroke-linecap', 'round');
    svg.append(line);
}

function drawLineChart(objects, selectedOption, selectedIndicator, svg, width, height) {
    
    const data = filterData(objects, selectedOption, selectedIndicator);

    parsedPoints = [];
    drawChart(data, selectedOption, selectedIndicator, svg, width, height);

    const pointString = populatePoints(data, width, height);

    drawPolyLine(pointString, selectedIndicator, svg);

    // Parse pointString into an array of points to be used in mouse move detection
    // const parsedPoints = pointString.split(' ').map(point => {
    //     const [xi, yi] = point.split(',');
    //     return { xi: parseFloat(xi), yi: parseFloat(yi) };
    // });

    // Add mousemove event listener for tooltip
    svg.addEventListener('mousemove', throttleMouseMoveHandler = throttle((e) => {
        const mx = e.clientX - svg.getBoundingClientRect().x;
        const my = e.clientY - svg.getBoundingClientRect().y;

        let foundPoint = null;

        // Check if mouse is near any point on the polyline
        for (let i = 0; i < parsedPoints.length; i++) {
            const point = parsedPoints[i];
            const distance = Math.sqrt((mx - point.xi) ** 2 + (my - point.yi) ** 2);

            // Adjust the tolerance value for hover detection
            if (distance < 10) {
                foundPoint = data[i];
                break;
            }
        }

        if (foundPoint) {
            showBootstrapTooltip(e.clientX, e.clientY, foundPoint);
        } else {
            hideBootstrapTooltip();
        }
    }, 50));

    // Hide tooltip when mouse leaves the SVG
    svg.addEventListener('mouseleave', hideBootstrapTooltip);
}

export function initializeLineChart(objects, svg, width, height, selectedOption, selectedIndicator, selector, buttons) {
    svg.innerHTML = "";
    parsedPoints = [];
    // Draw the line chart initially
    drawLineChart(objects, selectedOption, selectedIndicator, svg, width, height);

    // Event listener for changes in the dropdown selector
    const onSelectorChange = () => {
        selectedOption = selector.options[selector.selectedIndex].text;
        parsedPoints = [];
        svg.innerHTML = "";
        drawLineChart(objects, selectedOption, selectedIndicator, svg, width, height);
    };

    // Event listener for radio button changes (indicator selection)
    const onButtonClick = (e) => {
        if (e.target.checked) {
            selectedIndicator = e.target.value;
            parsedPoints = [];
            svg.innerHTML = "";
            drawLineChart(objects, selectedOption, selectedIndicator, svg, width, height);
        }
    };

    // Attach event listeners
    selector.addEventListener('change', onSelectorChange);
    buttons.forEach(button => button.addEventListener('click', onButtonClick));

    // Store cleanup function to remove event listeners when switching chart types
    svg.lineChartListeners = () => {
        selector.removeEventListener('change', onSelectorChange);
        buttons.forEach(button => button.removeEventListener('click', onButtonClick));
    };
}

export function removeMouseHandlersLineChart(svg) {
    // Cleanup event listeners when switching to another chart
    if (svg.lineChartListeners) {
        svg.lineChartListeners();
    }

    // Remove the mousemove event handler
    svg.removeEventListener('mousemove', throttleMouseMoveHandler);
    svg.removeEventListener('mouseleave', hideBootstrapTooltip);

    // Clear parsed points to avoid showing old data on new chart
    parsedPoints = [];
}
