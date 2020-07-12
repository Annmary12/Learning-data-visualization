import ds from './data.csv'
const margin = {
  top: 10,
  right: 30,
  bottom: 30,
  left: 60
}
const width = 460 - margin.right - margin.left
const height = 400 - margin.top - margin.bottom
let data

const svg = d3.select('#show-graph')
  .append('svg')
  .attr('width', width)
  .attr('height', height)
  .append('g')
  .attr('transform', 'translate(' + margin.left + ', -20)')

// https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv
// read the csv
d3.csv('https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/3_TwoNumOrdered_comma.csv')
  .then(d => {
    const parseDate = d3.timeParse('%Y-%m-%d')
    const dateFormat = d3.timeFormat('%Y')
    data = d.map(ds => ({ date: dateFormat(parseDate(ds.date)), value: ds.value }))

    drawLineChart()
  })
  .catch(err => console.error(err))

const drawLineChart = () => {
  const minmax = d3.extent(data, d => d.date)
  console.log(minmax, 'minmax-->>>')
  // const xScale = d3.scaleTime()
  //   .domain(d3.extent(data, d => d.date))
  //   .range([0, width])

  // svg.append('g')
  //   .attr('transform', 'translate(0,' + height + ')')
  //   .call(d3.axisBottom(xScale))

  var xScale = d3.scaleLinear()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width])
  svg.append('g')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale).ticks(5))

  // add y axis
  // const yScale = d3.scaleLinear()
  //   .domain([0, d3.max(data, d => d.value)])
  //   .range([height, 0])

  // svg.append('g').call(d3.axisLeft(yScale))

  var yScale = d3.scaleLinear()
    .domain([0, d3.max(data, (d) => d.value)])
    .range([height, 0])
  svg.append('g')
    .call(d3.axisLeft(yScale))

  // // line function
  const lnFunc = d3.line()
    .x(d => console.log(d, 'd==>>>') || d.date)
    .y(d => d.value)
    .curve(d3.curveLinear)

  // // add line
  // svg.append('path')
  //   .attr('d', lnFunc(data))
  //   // .attr('fill', 'none')
  //   .attr('stroke', 'red')
  //   .attr('stroke-width', 3.5)

    var line = svg
    .append('g')
    .append('path')
    .datum(data)
    .attr('d', lnFunc)
    // .attr('stroke', 'red')
    // .attr('stroke-width', 3.5)
    .attr('stroke', 'red')
    .style('stroke-width', 4)
    .style('fill', 'none')
}
