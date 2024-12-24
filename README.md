# Data Visuals

Data Visuals is a web application that provides interactive visualizations of various datasets, 
including bar charts and line charts, to help users analyze and understand data trends.

## Table of Contents

1. [About the Project](#about-the-project)
2. [Key Features](#key-features)
3. [Technical Details](#technical-details)
4. [Future Improvements](#future-improvements)

## About the Project

Data Visuals is designed to provide users with an intuitive way to explore key statistical indicators for countries
in the European Union. The application allows users to view GDP per capita, life expectancy, and population trends
over time through interactive bar and line charts.

The dataset includes data from 2000 to 2018 for all EU countries, fetched and processed dynamically using the
Eurostat API. This visualization tool is particularly helpful for analyzing historical trends and comparing
indicators across different countries.

## Key Features

### 1. Automatic Data Fetching
- Upon loading the application, the data for GDP per capita, life expectancy, and population for EU countries from 2006 to 2020 is automatically fetched and processed.
- Data is retrieved from the Eurostat API.
### 2. Bar and Line Charts
- Users can view trends for a selected indicator (GDP per capita, life expectancy, or population) and country.
- The visualization updates dynamically based on user selections.
- Both bar charts and line charts are implemented using SVG for scalability and interactivity.
### 3. Interactive Tooltip
- The charts include a tooltip feature that displays detailed information (year and value) for a given point on the chart when the user hovers over it.

## Technical Details

### Languages and Tools
- Languages: HTML, CSS, JavaScript
- Data Source: Eurostat API (JSON format)
- Data Processing: Data is dynamically fetched and processed in the browser.

### Project Structure
- `index.html`: Main entry point of the application.
- `styles.css`: Contains styles for the UI components.
- `main.js`: Initializes the application and manages the user interactions.
- `ChartManager.js`: Handles chart creation and updates.
- `utils.js`: Contains helper functions for data fetching and processing.
- `constants.js`: Stores static data such as the list of countries and API URLs.

## Future Improvements

The current implementation provides foundational features such as bar and line charts for data visualization. The following features are considered as future implementations:

1. **Bubble Charts**: Representing multiple indicators (e.g., GDP, life expectancy, population) using size and position in a 2D space.
2. **Animated Visualizations**: Displaying data trends over multiple years using animations for better storytelling.
3. **Data Table Visualization**: Adding a table view with color-coded cells based on how values compare to the EU average.