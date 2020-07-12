import data from './data.csv'

const h = 100
const w = 400
let ds, avgSales, minSales, maxSales
let salesTotal = 0
const metric = []
let sales

d3.csv(data)
  .then(data => {
    console.log(data)
    ds = data
    sales = ds.map(d => d.sales)
    drawLineChart()
    showTotal()
  })
  .catch(err => console.error(err))

const drawLineChart = () => {
  const svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h)

  const yScale = d3.scaleLinear()
    .domain(d => [d3.min(sales), d3.max(sales)])
    .range([0, h])

  const scale = d3.scaleLinear()
    .domain([130, 350])
    .range([0, 100])

  console.log(yScale(30), 'I am here')
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
  metric.push({ name: 'Sales Total', value: salesTotal })

  // get the average sales
  avgSales = salesTotal / ds.length
  metric.push({ name: 'Avg Total ', value: avgSales.toFixed() })

  // get min sales
  minSales = Math.min(...sales)
  metric.push({ name: 'Mininum Sales', value: minSales })

  // get max sales
  maxSales = Math.max(...sales)
  metric.push({ name: 'Maximun Sales', value: maxSales })

  // add total and avg to table
  const tr = table.selectAll('tr')
    .data(metric)
    .enter()
    .append('tr')
    .style('background-color', (d, i) => i % 2 !== 0 ? 'grey' : 'white')

  const td = tr.selectAll('td')
    .data((d) => Object.values(d))
    .enter().append('td')
    .text(d => d)
    .attr('width', '150px')
}
