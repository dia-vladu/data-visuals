import {countries} from "./../constants/constants.js";
import {oxAxisConfig, oyAxisConfig} from './../utils/chartAxisConfig.js';

// Function to draw the axis line (OX or OY)
function drawAxisLine(axisLineConfig, svg) {
    //Object destructuring 
    const { x1, y1, x2, y2, stroke, strokeWidth } = axisLineConfig;

    const axisLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    axisLine.setAttribute('x1', x1);
    axisLine.setAttribute('y1', y1);
    axisLine.setAttribute('x2', x2);
    axisLine.setAttribute('y2', y2);
    axisLine.setAttribute('stroke', stroke);
    axisLine.setAttribute('stroke-width', strokeWidth);
    svg.append(axisLine);
}

// Function to draw grid lines
function drawGridLines(gridLineConfig, svg, height) {
    //Object destructuring 
    const { count, yPosition, x1, x2, stroke, strokeDasharray, strokeWidth, fillOpacity } = gridLineConfig;

    for (let i = 0; i <= count; i++) {
        const gridLineY = yPosition(i, height);
        const gridLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        gridLine.setAttribute('x1', x1);
        gridLine.setAttribute('y1', gridLineY);
        gridLine.setAttribute('x2', x2);
        gridLine.setAttribute('y2', gridLineY);
        gridLine.setAttribute('stroke', stroke);
        gridLine.setAttribute('stroke-dasharray', strokeDasharray);
        gridLine.setAttribute('stroke-width', strokeWidth);
        gridLine.setAttribute('fill-opacity', fillOpacity);
        svg.append(gridLine);
    }
}

// Function to draw reference text next to the grid lines
function drawReferenceText(referenceTextConfig, data, svg, height ) {
    //Object destructuring 
    const { count, yPosition, fill, referenceText } = referenceTextConfig;

    for (let i = 0; i <= count; i++) {
        const gridLineY = yPosition(i, height);
        const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textElement.textContent = referenceText(i, data);
        textElement.setAttribute('x', 5); // x position for the reference text
        textElement.setAttribute('y', gridLineY); // y position based on the grid line
        textElement.setAttribute('font-size', 10);
        textElement.setAttribute('fill', fill);
        svg.append(textElement);
    }
}

// Main function to draw axe, grid lines, and reference text if available
function drawAxisAndGrid( axisConfig, data, svg, height, width ) {
    const { axisLineConfig, gridLineConfig, referenceTextConfig } = axisConfig;

    // Draw the axis line (either OX or OY)
    drawAxisLine(axisLineConfig, svg);

    // Draw grid lines
    if (gridLineConfig){
        drawGridLines(gridLineConfig, svg, height);
    }

    // Draw reference text next to the grid lines (Oy axis)
    if (referenceTextConfig){
        drawReferenceText(referenceTextConfig, data, svg, height);
    }
}

function drawIndicatorUnitText(selectedOption, selectedIndicator, position = { x: 55, y: 20 }) {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    
    if (selectedIndicator === "PIB") {
        text.textContent = 'thousands';
    } else if (selectedIndicator === 'POP') {
        if (['CY', 'LU', 'MT'].includes(selectedOption)) {
            text.textContent = 'hundreds of thousands';
        } else {
            text.textContent = 'millions';
        }
    } else {
        text.textContent = 'percentage (%)';
    }
    
    text.setAttribute('x', position.x);
    text.setAttribute('y', position.y);
    text.setAttribute('fill', 'rgb(144, 146, 164)');
    text.setAttribute('fill-opacity', 0.7);

    return text;
}

function drawTitle(svg, selectedOption, width) {
    const title = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    title.innerHTML = `${countries[selectedOption]}`;
    title.setAttribute('x', width - 110);
    title.setAttribute('y', 20);
    title.setAttribute('fill', 'rgb(144, 146, 164)');
    title.setAttribute('fill-opacity', 0.7);
    svg.append(title);
}

function filterData(data, selectedOption, selectedIndicator) {
    return data.filter(item => item.country === selectedOption && item.indicator === selectedIndicator);
}

function drawChart(data, selectedOption, selectedIndicator, svg, width, height) {
    svg.innerHTML = ""; // Clear previous SVG content

    //drawAxisAndGrid(oxAxisConfig, data, svg, height, width);
    drawAxisAndGrid(oxAxisConfig(height, width), data, svg, height, width);
    drawAxisAndGrid(oyAxisConfig(height, width), data, svg, height, width);

    // Draw the indicator unit text and title
    const indicatorText = drawIndicatorUnitText(selectedOption, selectedIndicator);
    svg.append(indicatorText); 

    drawTitle(svg, selectedOption, width);
}

export {drawAxisAndGrid, drawIndicatorUnitText, drawTitle, filterData, drawChart};