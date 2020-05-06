import data from './data.csv'

const h = 100
const w = 400
let ds, avgSales, minSales, maxSales
let salesTotal = 0
const metric = []

d3.csv(data)
  .then(data => {
    console.log(data)
    ds = data
    drawLineChart()
    showTotal()
  })
  .catch(err => console.error(err))

const drawLineChart = () => {
  const svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h)

  const lineFn = d3.line()
    .x(d => (d.month - 20130001) / 3.25)
    .y(d => h - d.sales)
    .curve(d3.curveLinear)

  svg.append('path')
    .attr('d', lineFn(ds))
    .attr('stroke', 'purple')
    .attr('stroke-width', 2)
    .attr('fill', 'none')
}

const showTotal = () => {
  const table = d3.select('body').append('table')

  // get the total of sales
  for (const data of ds) {
    salesTotal += parseInt(data.sales)
  }
  metric.push('Sales Total: ' + salesTotal)

  // get the average sales
  avgSales = salesTotal / ds.length
  metric.push('Avg Total: ' + avgSales.toFixed())

  // get min sales
  const sales = ds.map(d => d.sales)
  minSales = Math.min(...sales)
  metric.push('Mininum Sales: ' + minSales)

  // get max sales
  maxSales = Math.max(...sales)
  metric.push('Maximun Sales: ' + maxSales)

  // add total and avg to table
  var tr = table.selectAll('tr')
    .data(metric)
    .enter()
    .append('tr')
    .append('td')
    .text(d => d)
}
