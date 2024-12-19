let tooltip;

// Function to create and show the tooltip
export function showBootstrapTooltip(mx, my, content) {
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'chart-tooltip';
        tooltip.className = 'tooltip-custom'; // Custom class for styling
        
        const tooltipInner = document.createElement('div');
        tooltipInner.className = 'tooltip-inner';
        tooltip.appendChild(tooltipInner);

        document.body.appendChild(tooltip);
    }

    // Update content and position
    tooltip.querySelector('.tooltip-inner').innerHTML = `
        <strong>Year:</strong> ${content.year}<br>
        <strong>Value:</strong> ${content.value.toLocaleString('de-DE')}
    `;
    tooltip.style.position = 'absolute';
    tooltip.style.left = `${mx + 15}px`; // Offset from mouse
    tooltip.style.top = `${my + 15}px`;
}

// Function to hide and remove the tooltip
export function hideBootstrapTooltip() {
    if (tooltip) {
        tooltip.remove();
        tooltip = null;
    }
}

// Throttle function to limit calls
export function throttle(func, limit) {
    let lastCall = 0;
    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            return func(...args);
        }
    };
}