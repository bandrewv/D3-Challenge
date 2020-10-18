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
    * Load, print, and cast the data points you'll be using from strings to numbers
        ```
        // Load data from data.csv
            d3.csv("assets/data/data.csv").then(healthData => {

                // Print the data
                console.log(healthData);

                // Cast the poverty and obesity values to numbers
                healthData.forEach(data => {
                    data.poverty = +data.poverty;
                    data.obesity = +data.obesity;
                });
        ```
    * Configure and append your axes, data points, and data labels all within your d3.csv function
        ```
        // Configure a linear scale with a range between the chartHeight and 0

        var xLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d.poverty), d3.max(healthData, d => d.poverty)])
        .range([0, chartWidth]).nice();

        var yLinearScale = d3.scaleLinear()
        .domain([d3.min(healthData, d => d.obesity), d3.max(healthData, d => d.obesity)])
        .range([chartHeight, 0]).nice();

        // Create two new functions passing the scales in as arguments
        // These will be used to create the chart's axes
        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        // Append the "g" elements to the chartGroup, creating axes
        chartGroup.append("g")
            .attr("transform", `translate(0, ${chartHeight})`)
            .call(bottomAxis);
        
        chartGroup.append("g")
            .call(leftAxis);

        // Append scatter plot circles to the chart
        var circlesGroup = chartGroup.append("g")
            .selectAll("circle")
            .data(healthData)
            .join("circle")
            .attr("cx", d => xLinearScale(d.poverty))
            .attr("cy", d => yLinearScale(d.obesity))
            .attr("r", 10)
            .attr("fill", "teal");

        // Add labels to the circle locations
        var circleLabels = chartGroup.append("g")
            .selectAll("text")
            .data(healthData)
            .join("text")
                .attr("id", "stateCode")
                .attr("x", d => xLinearScale(d.poverty)-8)
                .attr("y", d => yLinearScale(d.obesity)+5)
                .style("fill", "white")
                .style("font-size", 12)
                .text(d => d.abbr);

        // Create axes labels
        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (chartHeight / 2))
            .attr("dy", "1em")
            .attr("class", "axisText")
            .text("Obesity Rate (%)");
        
        chartGroup.append("text")
            .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top / 2})`)
            .attr("class", "axisText")
            .text("Poverty Rate (%)");
        ```

* In the HTML File, include your findings within the paragraph elements
    ```
     <p>New data suggests there is a correlation between poverty rate and obesity rates in the United States and
    Washington DC. The chart above, consisting of 2015 CDC data, shows a positive correlation, meaning as the poverty
    rate (along the x or horizontal axis) increases, the obesity rate (along the y or vertical axis) also increases.
    ***Please note we are not suggesting causation in this chart, merely identifying correlation.
    </p>

    <p>Outside of a few exceptions (New Mexico and Washington DC - higher poverty rates/lower obesity rates), the trend
    is pretty clear. There are undoubtedly many underlying causes that factor into this relationship, one that jumps
    to mind is access to healthy food. Areas with higher poverty rates are more likely to live in places that are
    identified as "food deserts" which means limited access to grocery stores that stock more fresh foods as opposed to
    processed or packaged foods. The map below shows where those areas are most heavily located in the US.
    </p>
    <img style="-webkit-user-select: none;margin: auto;" src="https://images.squarespace-cdn.com/content/v1/56aa72fafd5d086d4ab3a758/1515524359394-41IX2H92UXI6R3QFJL8C/ke17ZwdGBToddI8pDm48kFUyCP7aVS1lTOUCbL7IR_5Zw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIrOqksKsYcT2blSgBKCC7Hxf7dnc4N7ocA-fnWaNU0noKMshLAGzx4R3EDFOm1kBS/food-deserts+in+America+MAP.jpg?format=750w">
    <p>As noted above, the relationship between poverty rate and obesity rate is correlative and not causative. Despite
    the caveat, decreasing a state's poverty rate is likely to increase the population's spending power. One of the
    reason's for food deserts is that there is not enough incentive for a grocery chain to be located in an area with
    high poverty. If poverty is decreased, there would likely be greater incentive for healthier food to make its way
    into those areas, which could then have an impact on the obesity rate.
    </p>
    ```