# D3-Challenge

## Project Materials

* index.html file
    * Contains your HTML code
* Assets Folder
    * Contains the following:
        * css folder
            * d3Styles.css
            * style.css
        * data folder
            * data.csv
        * js folder
            * app.js


## Project Steps

* In the app.js file:
    * Add area dimensions for the SVG area that will store the chart, as well as the chart area dimensions including margins
        ```
        // Set dimensions and margins of the graph
        var svgWidth = 750;
        var svgHeight = 700;

        var margin = {
            top: 90,
            right: 90,
            bottom: 90,
            left: 90
        };

        // Defining the dimensions of the chart area
        var chartWidth = svgWidth - margin.left - margin.right;
        var chartHeight = svgHeight - margin.top - margin.bottom;
        ```
    * Append the SVG area to your HTML code
        ```
        var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);
        ```
    * Append a group area within the SVG area and set its margins
        ```
        var chartGroup = svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);
        ```