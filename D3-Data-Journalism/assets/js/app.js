// @TODO: YOUR CODE HERE!
// Load data from data.csv
d3.csv("assets/data/data.csv").then(data => {

    // Print the data
    console.log(data);
  
    // Cast the hours value to a number for each piece of tvData
    data.forEach(function(state) {
      state.poverty = +state.poverty;
      state.smokes = +state.smokes;
    });
  
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