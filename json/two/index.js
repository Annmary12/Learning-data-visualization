import data from './MonthlySalesbyCategoryMultiple.json'

const h = 200
const w = 400
const padding = 30
console.log('data--->>>', data.contents)
// for JSON, instead of doing this d3.json(jsonfile), you can load it directly because if you make a call, it will be looking for url
data.contents.forEach(item => {
  showHeader(item)
  drawLineChart(item)
})

d3.select('select').on('change', () => {

    const ds = data.contents
    // console.log({content: data, ds}, 'ds---->>>>')
    const sel = d3.select('#data-option').node().value
  ds.forEach(d => {
    // console.log(d, 'what is there-->>')
    d.monthlySales.splice(0, d.monthlySales.length - sel)
    // console.log({ d, sel }, 'onchange--->>>')
   updateLineChart(d)
  })
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

function drawXScale (ds) {
  const minDate = getDate(ds.monthlySales[0].month)
  const maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1].month)
  console.log({minDate, maxDate, ds }, 'drawYScale===>>>')

  const xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([padding, w - padding])

  return xScale
}

function drawYScale (ds) {
  const yScale = d3.scaleLinear()
    .domain([0, d3.max(ds.monthlySales, d => d.sales)])
    .range([h - padding, 0])

  return yScale
}

function drawLineChart (ds) {
  const svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h)
    .attr('id', 'svg-' + ds.category)

  const xScale = drawXScale(ds)
  const yScale = drawYScale(ds)

  // draw the y axis
  const yAxis = d3.axisLeft(yScale).ticks(4)

  svg.append('g')
    .attr('class', 'y-axis')
    .attr('transform', 'translate(20, 0)')
    .call(yAxis)

  // draw the axis
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b'))

  // append to svg
  svg.append('g')
    .attr('class', 'x-axis')
    .attr('transform', 'translate(0, ' + (h - padding) + ')')
    .call(xAxis)

  const lineFn = d3.line()
    .x(d => xScale(getDate(d.month)))
    .y(d => yScale(d.sales))
    .curve(d3.curveLinear)

  svg.append('path')
    .attr('d', lineFn(ds.monthlySales))
    .attr('stroke', 'purple')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
    .attr('class', 'path-' + ds.category)
}

function showHeader (ds) {
  d3.select('body')
    .append('h1')
    .text(ds.category + ' Sales (2016)')
    .attr('font-size', '10px')
}

function updateLineChart (ds) {
  console.log(ds, 'Debuging--->>>')
  const minDate = getDate(ds.monthlySales[0].month)
  const maxDate = getDate(ds.monthlySales[ds.monthlySales.length - 1].month)
  console.log({ minDate, maxDate, ds }, 'drawYScale===>>>')

  const xScale = d3.scaleTime()
    .domain([minDate, maxDate])
    .range([padding, w - padding])

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(ds.monthlySales, d => d.sales)])
    .range([h - padding, 0])

  const yAxis = d3.axisLeft(yScale).ticks(4)
  const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat('%b')).ticks(ds.monthlySales.length - 1)

  const lineFn = d3.line()
    .x(d => xScale(getDate(d.month)))
    .y(d => console.log(d, 'shoo--->>>') || yScale(d.sales))
    .curve(d3.curveLinear)

  const svg = d3.select('body').selectAll('svg-' + ds.category)

  svg.selectAll('g.y-axis').call(yAxis)
  svg.selectAll('g.x-axis').call(xAxis)
console.log('.path-' + ds.category, 'which path--->>>')
  svg.selectAll('path-'+ds.category).attr('d', lineFn(ds.monthlySales))
}
