import * as d3 from 'd3';

var d3BarChart = {};

d3BarChart.create = function(el, data) {
  //modify width of chart and height of lines
  var width = 1000;
  var barHeight = 20;

  //scaleLinear will modify the data to a range based on the domain
    //then scale each input to a range specified on the range
  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 500])

  //theres 53 inputs..
  var y = d3.scaleLinear()
    .domain([0, 52])
    .range([0, barHeight * data.length])

  var svg = d3.select(el).append('svg')
      .attr('class', 'd4')
      .attr('width', width)
      .attr('height', barHeight * data.length);

  //150 is to move it to the right
  var bar = svg.selectAll('g')
    .data(data)
    .enter().append('g')
    .attr("transform", function(d, i) {
      return "translate(150," + i * barHeight + ")" })

    bar.append("rect")
      .attr("width", function(d) {
        return x(d.percentile * 100)
      })
      .attr("height", barHeight - 1)
      .style('fill', 'steelblue')
      .exit()
    
    bar.append("text")
      .attr("x", function(d) { 
        return -150
      })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) {
        let trait = d.trait_id;
        trait = trait.slice(trait.indexOf('_') + 1).replace(/\_/g, ' ');
        return `${trait}` ;
      });

    bar.append("text")
      .attr("x", function(d) { 
        return 0;
      })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .style('fill', 'orange')
      .text(function(d) {
        return `${Math.round(d.percentile * 100)}`
      });
};

export default d3BarChart
