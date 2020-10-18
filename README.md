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
        * code()
            '''
            // Set dimensions and margins of the graph
            var svgWidth = 960;
            var svgHeight = 600;

            var margin = {
                top: 60,
                right: 60,
                bottom: 60,
                left: 60
            };

            // Defining the dimensions of the chart area
            var chartWidth = svgWidth - margin.left - margin.right;
            var chartHeight = svgHeight - margin.top - margin.bottom;
            '''
    * Append the SVG area to your HTML code
        * code()
            '''
            var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
            '''