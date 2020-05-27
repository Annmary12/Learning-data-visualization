// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 60 }
    var width = 460 - margin.left - margin.right
    var height = 400 - margin.top - margin.bottom

// append the svg object to the body of the page
var svg = d3.select('#show-graph')
  .append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.top + margin.bottom)
  .append('g')
  .attr('transform',
    'translate(' + margin.left + ',' + margin.top + ')')

// Read the data
d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered.csv')
  .then(data => {
    console.log(data)
    drawGraph(data)
  })
  .catch(err => console.error(err))

const drawGraph = (data) => {
  var allGroup = d3.map(data, function (d) {
    return (d.name)
  }).keys()

  // add the options to the button
  d3.select('#selectButton')
    .selectAll('myOptions')
    .data(allGroup)
    .enter()
    .append('option')
    .text(function (d) { return d }) // text showed in the menu
    .attr('value', function (d) { return d }) // corresponding value returned by the button

  // A color scale: one color for each group
  var myColor = d3.scaleOrdinal()
    .domain(allGroup)
    .range(d3.schemeCategory10)

  // Add X axis --> it is a date format
  var x = d3.scaleLinear()
    .domain(d3.extent(data, function (d) { return d.year }))
    .range([0, width])
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(x).ticks(7))

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, d3.max(data, function (d) { return +d.n })])
    .range([height, 0])
  svg.append('g')
    .call(d3.axisLeft(y))

  // Initialize line with first group of the list
  var line = svg
    .append('g')
    .append('path')
    .datum(data.filter(function (d) { return d.name == allGroup[0] }))
    .attr('d', d3.line()
      .x(function (d) { return x(d.year) })
      .y(function (d) { return y(+d.n) })
    )
    .attr('stroke', () => myColor(allGroup[0]))
    .style('stroke-width', 4)
    .style('fill', () => myColor(allGroup[0]))

  // A function that update the chart
  function update (selectedGroup) {
    // Create new data with the selection?
    var dataFilter = data.filter(function (d) { return d.name == selectedGroup })

    // Give these new data to update line
    line
      .datum(dataFilter)
      .transition()
      .duration(1000)
      .attr('d', d3.line()
        .x(function (d) { return x(d.year) })
        .y(function (d) { return y(+d.n) })
      )
      .attr('stroke', () => myColor(selectedGroup))
      .style('fill', () => myColor(selectedGroup))
  }

  // When the button is changed, run the updateChart function
  d3.select('#selectButton').on('change', function (d) {
    // recover the option that has been chosen
    var selectedOption = d3.select(this).property('value')
    // run the updateChart function with this selected option
    update(selectedOption)
  })
}