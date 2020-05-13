import data from './MonthlySales.json'

const h = 100
const w = 400

// for JSON, instead of doing this d3.json(jsonfile), you can load it directly because if you make a call, it will be looking for url

const drawLineChart = () => {
  const svg = d3.select('body').append('svg')
    .attr('width', w)
    .attr('height', h)

  const lineFn = d3.line()
    .x(d => (d.month - 20130001) / 3.25)
    .y(d => h - d.sales)
    .curve(d3.curveLinear)

  svg.append('path')
    .attr('d', lineFn(data))
    .attr('stroke', 'purple')
    .attr('stroke-width', 2)
    .attr('fill', 'none')  
}

drawLineChart()
