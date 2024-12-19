import { chartColors } from "../styles/colors.js";

const indicatorColors = {
    PIB: { color: chartColors.PIB, opacity: 0.9 },
    SV: { color: chartColors.SV, opacity: 0.8 },
    POP: { color: chartColors.POP, opacity: 0.8 }
};

// Define attribute mappings based on the tag type
const attributeMap = {
    rect: { 'fill': (color, opacity) => ({ fill: color, 'fill-opacity': opacity }) },
    line: { 'stroke': (color) => ({ stroke: color }) },
    polyline: { 'stroke': (color) => ({ stroke: color }) },
};

/**
 * Sets the color and opacity of an SVG element based on the selected indicator.
 * 
 * @param {SVGElement} element - The SVG element to set the color and opacity for.
 * @param {string} indicator - The indicator name (e.g., 'PIB', 'SV', 'POP').
 */
function setElementColor(element, indicator) {
    const { color, opacity } = indicatorColors[indicator] || {};

    if (!color) return; // Exit if no color is found for the indicator.

    // Normalize tag name to lowercase for consistent comparison
    const tagName = element.tagName.toLowerCase();
    const attributes = attributeMap[tagName];

    // Apply attributes if a mapping exists for the tag
    if (attributes) {
        const attrs = attributes['fill'] || attributes['stroke'];
        if (attrs) {
            Object.entries(attrs(color, opacity)).forEach(([attr, value]) => {
                if (value !== undefined) {
                    element.setAttribute(attr, value);
                }
            });
        }
    }
}

export {setElementColor};