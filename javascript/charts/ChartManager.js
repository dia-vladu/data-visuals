import { removeMouseHandlersBarChart, initializeBarChart } from "./drawBarChart.js";
import { removeMouseHandlersLineChart, initializeLineChart } from "./drawLineChart.js";

export class ChartManager {
  constructor(objects, svg, selector, buttons) {
    this.objects = objects;
    this.svg = svg;
    this.selector = selector;
    this.buttons = buttons;
  }

  initializeChart() {
    const chartType = this.getSelectedChartType();
    const selectedIndicator = this.getSelectedIndicator();
    const selectedCountry = this.getSelectedCountry();

    if (chartType === "bar") {
      removeMouseHandlersLineChart(this.svg);
      initializeBarChart(
        this.objects,
        this.svg,
        this.svg.getAttribute("width"),
        this.svg.getAttribute("height"),
        selectedCountry,
        selectedIndicator,
        this.selector,
        this.buttons
      );
    } else {
      removeMouseHandlersBarChart(this.svg);
      initializeLineChart(
        this.objects,
        this.svg,
        this.svg.getAttribute("width"),
        this.svg.getAttribute("height"),
        selectedCountry,
        selectedIndicator,
        this.selector,
        this.buttons
      );
    }
  }

  getSelectedChartType() {
    return document.querySelector("input[name='chart_type']:checked").value;
  }

  getSelectedIndicator() {
    return document.querySelector("input[name='option']:checked").value;
  }

  getSelectedCountry() {
    return this.selector.options[this.selector.selectedIndex].text;
  }
}
