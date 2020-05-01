const h = 500
const w = 400

var monthlySales = [
  { month: 10, sales: 100 },
  { month: 20, sales: 130 },
  { month: 30, sales: 250 },
  { month: 40, sales: 300 },
  { month: 50, sales: 265 },
  { month: 60, sales: 225 },
  { month: 70, sales: 180 },
  { month: 80, sales: 120 },
  { month: 90, sales: 145 },
  { month: 100, sales: 130 }
]

// KPI sales
const salesKpi = (d) => {
  if (d > 200) {
    return 'green'
  } else if (d < 200 && d > 100) {
    return 'blue'
  } else {
    return 'red'
  }
}

// get labels
const getLabels = (data, col, val, type) => {
  // get the max value
  const max = d3.max(data, d => d[col])
  // get min value
  const min = d3.min(data, d => d[col])

  if (type === 'minmax' && (min === val || max === val)) {
    return val
  } else if (type === 'all') return val
}
// create svg
const svg = d3.select('body').append('svg').attr({
  width: w,
  height: h
})

// create dots
const dots = svg.selectAll('circle')
  .data(monthlySales)
  .enter()
  .append('circle')
  .attr({
    cx: function (d) { return d.month * 3 },
    cy: function (d) { return h - d.sales },
    r: 5,
    fill: function (d) { return salesKpi(d.sales) }
  })

// create labels
const labels = svg.selectAll('text')
  .data(monthlySales)
  .enter()
  .append('text')
  .text(function (d) {
    return getLabels(monthlySales, 'sales', d.sales, 'minmax')
  })
  .attr({
    x: function (d) { return d.month * 3 - 28},
    y: function (d) { return h - d.sales },
    'font-size': '12px',
    'font-family': 'monospace',
    'font-weight': 'bold',
    'text-anchor': 'start'
  })
