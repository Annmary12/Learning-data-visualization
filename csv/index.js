import data from './data.csv'

const w = 100
const h = 400
let ds

d3.csv(data)
  .then(data => {
    console.log(data)
    ds = data
  })
  .catch(err => console.error(err))

const svg = d3.select('body').append('svg')
  .attr('width', w)
  .attr('height', h)

const lineFn = d3.line()
  .x(d => console.log(d) || (d.month - 20130001) / 3.25)
  .y(d => h - d.sales)
  .curve(d3.curveLinear)

svg.enter()
  .append('path')
  .data(ds)
  .attr("class", "line")  
  //.attr('d', lineFn)
  // .attr('stroke', 'purple')
  // .attr('stroke-width', 1)
  // .attr('fill', 'none')
