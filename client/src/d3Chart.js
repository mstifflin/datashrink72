import * as d3 from 'd3';

var d3Chart = {};

d3Chart.create = function(el, props, state) {
  var svg = d3.select(el).append('svg')
      .attr('class', 'd3')
      .attr('width', props.width)
      .attr('height', props.height);

  svg.append('g')
      .attr('class', 'd3-points');

  this.update(el, state);
};

d3Chart.update = function(el, state) {
  // Re-compute the scales, and render the data points
  var scales = this._scales(el, state.domain);
  this._drawPoints(el, scales, state.data);
};


d3Chart._scales = function(el, state) {

  if (!state) {
    return null;
  }

  var width = el.offsetWidth;
  var height = el.offsetHeight;

  console.log(width, height)

  var x = d3.scaleLinear()
    .domain(state.x)
    .range([0, width]);

  var y = d3.scaleLinear()
    .domain(state.y)
    .range([height, 0]);

  var z = d3.scaleLinear()
    .domain([1, 10])
    .range([1, 10]);

  return {x: x, y: y, z: z};
}

d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

d3Chart._drawPoints = function(el, scales, data) {
  console.log('data we are using', data)
  var g = d3.select(el).selectAll('.d3-points');

  var point = g.selectAll('.d3-point')
    .data(data, function(d) { return d.id; });

  // ENTER
  point.enter().append('circle')
      // .style('fill', 'steelblue')
      .attr('class', 'd3-point')
      // .attr('cx', 5)
      // .attr('cy', 5)
      // .attr('r', 5)

  // ENTER & UPDATE
 
      .attr('cx', function(d) { return scales.x(d.x); })
      .attr('cy', function(d) { return scales.y(d.y); })
      .attr('r', function(d) { return scales.z(d.z); });


  // EXIT
  point.exit()
      .remove();
};

export default d3Chart
