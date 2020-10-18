// @TODO: YOUR CODE HERE!

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

// Select "scatter" id, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a group area within the SVG area and set its margins
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(data => {

    // Print the data
    console.log(data);
  
    // Cast the poverty and smokes values to numbers
    data.forEach(function(state) {
      state.poverty = +state.poverty;
      state.smokes = +state.smokes;
      state.obesity = +state.obesity;
    });
    

    // Configure a linear scale with a range between the chartHeight and 0
    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, ypoint => ypoint.poverty)])
    .range([chartHeight, 0]);

    var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(data, xpoint => xpoint.obesity)])
    .range([0, chartWidth]);


    // Create two new functions passing the scales in as arguments
    // These will be used to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    var drawLine = d3.line()
    .x(xpoint => xLinearScale(xpoint.obesity))
    .y(ypoint => yLinearScale(ypoint.poverty));

    // Append an SVG path and plot its points using the line function
    chartGroup.append("path")
    // The drawLine function returns the instructions for creating the line for forceData
    .attr("d", drawLine(data))
    .classed("line", true);


    // Append an SVG group element to the chartGroup, create the left axis inside of it
    chartGroup.append("g")
        .classed("axis", true)
        .call(leftAxis);

    // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // Translate the bottom axis to the bottom of the page
    chartGroup.append("g")
        .classed("axis", true)
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(bottomAxis);


    console.log(yLinearScale);

    //   // Append an SVG group element to the chartGroup, create the left axis inside of it
    // chartGroup.append("g")
    // .classed("axis", true)
    // .call(leftAxis);

    // // Append an SVG group element to the chartGroup, create the bottom axis inside of it
    // // Translate the bottom axis to the bottom of the page
    // chartGroup.append("g")
    // .classed("axis", true)
    // .attr("transform", `translate(0, ${chartHeight})`)
    // .call(bottomAxis);


    // Configure a smoking scale
    // var smokeTimeScale = d3.

    // var barSpacing = 10; // desired space between each bar
    // var scaleY = 8; // 8x scale on rect height
  
    // // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
    // var barWidth = (chartWidth - (barSpacing * (tvData.length - 1))) / tvData.length;
  
    // // @TODO
    // // Create code to build the bar chart using the tvData.
    // chartGroup.selectAll(".bar")
    //   .data(tvData)
    //   .join("rect")
    //   .classed("bar", true)
    //   .attr("width", d => barWidth)
    //   .attr("height", d => d.hours * scaleY)
    //   .attr("x", (d, i) => i * (barWidth + barSpacing))
    //   .attr("y", d => chartHeight - d.hours * scaleY);
  
//   }).catch(error => console.log(error));

});