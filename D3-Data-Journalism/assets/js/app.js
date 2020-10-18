// @TODO: YOUR CODE HERE!

// Set dimensions and margins of the graph
var svgWidth = 750;
var svgHeight = 700;

var margin = {
    top: 60,
    right: 60,
    bottom: 90,
    left: 60
};

// Defining the dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select "scatter" id, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area within the SVG area and set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(healthData => {

    // Print the data
    console.log(healthData);
    
    stateAbbr = [];

    // Cast the poverty and obesity values to numbers
    healthData.forEach(data => {
        data.poverty = +data.poverty;
        data.obesity = +data.obesity;
        stateAbbr.push(data.abbr);
    });
    
    // Configure a linear scale with a range between the chartHeight and 0

    var xLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.obesity), d3.max(healthData, d => d.obesity)])
    .range([0, chartWidth]).nice();

    var yLinearScale = d3.scaleLinear()
    .domain([d3.min(healthData, d => d.poverty), d3.max(healthData, d => d.poverty)])
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
    var circlesGroup = chartGroup.selectAll("circle")
        .data(healthData)
        .join("circle")
        .attr("cx", d => xLinearScale(d.obesity))
        .attr("cy", d => yLinearScale(d.poverty))
        .attr("r", 7.5)
        .attr("fill", "blue")
        .text(d => d.abbr)

    // Create axes labels
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Poverty Rate");
    
    chartGroup.append("text")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + margin.top})`)
        .attr("class", "axisText")
        .text("Obesity Rate");
});