import {setElementColor} from '../utils/colorUtils.js'

// Function to scale data (handling millions, thousands, or raw values)
function scaleValue(value, maxValue, minValue) {
    let aux = value;
    if (maxValue >= 1000000) {
        maxValue /= 1000000;
        minValue /= 1000000;
        if (value >= 1000000) {
            aux = value / 1000000;
        }
    } else if (maxValue >= 1000) {
        maxValue /= 1000;
        minValue /= 1000;
        if (value >= 1000) {
            aux = value / 1000;
        }
    }
    return { aux, maxValue, minValue };
}

// Function to calculate and return the properties of a bar
function calculateBarProperties(index, value, totalBars, chartHeight, chartWidth, maxValue, minValue) {
    const width = (chartWidth - 75) / totalBars;
    const scaleFactor = (chartHeight - 60) / (Math.ceil(maxValue) - Math.floor(minValue));

    // Calculate the X position, Y position, and height of the bar
    const xPosition = index * width + 0.1 * width;
    const { aux, maxValue: scaledMax, minValue: scaledMin } = scaleValue(value, maxValue, minValue);
    const yPosition = chartHeight - 30 - (chartHeight - 60) / (Math.ceil(scaledMax) - Math.floor(scaledMin)) * (aux - Math.floor(scaledMin));

    const barHeight = chartHeight - 30 - yPosition;
    const barWidth = 0.8 * width;  // Reduce width to 80%

    return { xPosition, yPosition, barHeight, barWidth, value };
}

// Function to draw a bar on the chart
function drawBar(svg, xPosition, yPosition, barWidth, barHeight, selectedIndicator) {
    const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rect.setAttribute('x', xPosition + 50); // Adjust x-position with margin
    rect.setAttribute('y', yPosition);
    rect.setAttribute('width', barWidth);
    rect.setAttribute('height', barHeight);
    setElementColor(rect, selectedIndicator); // Apply color based on indicator
    svg.append(rect);
}

// Function to draw all bars
function drawBars(data, svg, chartHeight, chartWidth, selectedIndicator, barsList) {
    const maxValue = Math.max(...data.map(item => item.value));
    const minValue = Math.min(...data.map(item => item.value));

    data.forEach((item, index) => {
        const { xPosition, yPosition, barHeight, barWidth } = calculateBarProperties(
            index, item.value, data.length, chartHeight, chartWidth, maxValue, minValue
        );

        drawBar(svg, xPosition, yPosition, barWidth, barHeight, selectedIndicator);

        // Store the bar properties (optional for future reference)
        barsList.push({
            'xi': xPosition + 50,
            'yi': yPosition,
            'wi': barWidth,
            'hi': barHeight,
            'value': item.value,
            'year': item.year
        });
    });
}

export {drawBars}