var h = 100
var w = 300
var padding = 2
var dataset = [5, 10, 15, 20, 25, 7, 11, 9, 16, 26, 22, 8]
var colors = ['red', 'orange', 'blue', 'green', 'grey']

var svg = d3.select('body')
  .append('svg')
  .attr({
    width: w,
    height: h
  })

svg.selectAll('rect')
  .data(dataset)
  .enter()
  .append('rect')
  .attr({
    x: function (d, i) { return (i * w / dataset.length) },
    y: function (d) { return h - (d * 4) },
    width: (w / dataset.length) - padding,
    height: function (d) { return d * 4 },
    fill: function (d) { return 'rgb(0, ' + (d * 5) + ', 0)' }
  })

svg.selectAll('text')
  .data(dataset)
  .enter()
  .append('text')
  .text(function (d) { return d })
  .attr({
    x: function (d, i) { return (i * w / dataset.length + (w / dataset.length - padding) / 6) },
    y: function (d) { return h - (d * 4) + 18 },
    'font-family': 'monospace',
    'font-size': 12,
    fill: '#ffffff'
  })
