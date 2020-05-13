import data from './MonthlySalesbyCategoryMultiple.json'

const h = 200
const w = 400
const padding = 30

// for JSON, instead of doing this d3.json(jsonfile), you can load it directly because if you make a call, it will be looking for url
data.contents.forEach(item => {
  showHeader(item)
  drawLineChart(item)
})

function getDate (d) {
  // convert to string
  const strDate = d.toString()

  // 20130101
  const year = strDate.substr(0, 4)
  const month = strDate.substr(4, 2) - 1 // because months starts with a zero index
  const day = strDate.substr(6, 2)

  return new Date(year, month, day)
}

function drawXScale (svg, ds) {
  const minDate = getDate(ds.monthlySales[0].month)
  const maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1].month)

  const xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([padding, w - padding])

  // draw the axis
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b'))

  // append to svg
  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(0, ' + (h - padding) + ')')
    .call(xAxis)

  return xScale
}

function drawYScale (svg, ds) {
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(ds.monthlySales, d => d.sales)])
    .range([h - padding, 0])

  // draw the y axis
  const yAxis = d3.axisLeft(yScale).ticks(4)

  svg.append('g')
    .attr('class', 'axis')
    .attr('transform', 'translate(20, 0)')
    .call(yAxis)

  return yScale
}

function drawLineChart (ds) {
  const svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h)

  const xScale = drawXScale(svg, ds)
  const yScale = drawYScale(svg, ds)

  const lineFn = d3.line()
    .x(d => xScale(getDate(d.month)))
    .y(d => yScale(d.sales))
    .curve(d3.curveLinear)

  svg.append('path')
    .attr('d', lineFn(ds.monthlySales))
    .attr('stroke', 'purple')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
}

function showHeader (ds) {
  d3.select('body')
    .append('h1')
    .text(ds.category + ' Sales (2016)')
    .attr('font-size', '10px')
}
