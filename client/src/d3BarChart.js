import * as d3 from 'd3';
var reorder = require('./d3order.js')


var d3BarChart = {};

d3BarChart.create = function(el, data) {
  //modify width of chart and height of lines
  var totalWidth = 1250;
  var barHeight = 35;
  var sortedData = reorder(data);
  //abstract somewhere
  const twoDecFormat = (n) => parseFloat(Math.round(n * 10000) / 100).toFixed(2);

  //scaleLinear will modify the data to a range based on the domain
    //then scale each input to a range specified on the range

  var margin = {top: 65, right: 0, bottom: 15, left: 15};
  var padding = {top: 0, right: 0, bottom: 0, left: 0};

  var outerWidth = totalWidth;
  var outerHeight = barHeight * data.length + margin.top + margin.bottom + padding.top + padding.bottom;
  var innerWidth = outerWidth - margin.left - margin.right;
  var innerHeight = outerHeight - margin.top - margin.bottom;
  var width = innerWidth - padding.left - padding.right;
  var height = innerHeight - padding.top - padding.bottom;

  var colorCodes = {
    facet: '#79872b',
    big5: '#145b57',
    need: '#a55d22',
    value: '#a0558d'
  }

  var legendData = [
    {name: 'facet', color: '#79872b'},
    {name: 'big5', color: '#145b57'},
    {name: 'need', color: '#a55d22'},
    {name: 'value', color: '#a0558d'}
  ];

  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 800])

  //theres 53 inputs..
  var y = d3.scaleLinear()
    .domain([0, 52])
    .range([0, barHeight * data.length])



  var svg = d3.select(el).append('svg')
    .attr('class', 'barChart')
    .attr("width", totalWidth)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", '#293950');
  //pass in title as prop w/user
  svg.append("g").append('text')
    .attr("x", 30 - margin.left - padding.left)             
    .attr("y", 30 - margin.top - padding.top)
    .attr('class', 'bubbleTitle')
    .text("TWITTER PERSONALITY ANALYSIS");
  
  //165 is to move it to the right

  var bar = svg.selectAll('.arbitraryClassName')
    .data(sortedData)
    .enter().append('g')
    .attr('class', 'chartNode')
    .attr("transform", function(d, i) {
      return "translate(165," + i * barHeight + ")" })

    bar.append("rect")
      .attr("width", function(d) {
        return x(d.percentile * 100)
      })
      .attr("height", barHeight - 5)
      .attr('fill', function(d) {
        var fullTrait = d.trait_id;
        var colorGroup = fullTrait.slice(0, fullTrait.indexOf('_'))
        return colorCodes[colorGroup];
      })
      .exit()
    
    bar.append("text")
      .attr("x", function(d) { 
        return -165;
      })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .attr('class', 'barChartLabels')
      .text(function(d) {
        let trait = d.trait_id;
        trait = trait.slice(trait.indexOf('_') + 1).replace(/\_/g, ' ');
        return trait;
      });

    bar.append("text")
      .attr("x", function(d) { 
        return 0;
      })
      .attr('x', function(d) {
        return Math.max(5, x(d.percentile * 100) - 55)
      })
      .attr('y', barHeight / 2)
      .attr('dy', ".35em")
      .style('fill', 'white')
      .text(function(d) {
        return twoDecFormat(d.percentile);
      });

      var legend = svg.append('g')
            .selectAll('g')
            .data(legendData)
            .enter()
            .append('g')
            .attr('transform', function(d, i) {
              return "translate(1100," + i * 15 + ")";
            });
          legend
            .append('rect')
            .attr('fill', (d) => d.color)
            .attr('width', 20)
            .attr('height', 10);
          legend
            .append('text')
            .attr('x', + 35)
            .attr('y', + 10)
            .text(d => d.name)
            .attr('class', 'bubbleNode')
            .exit();
};

export default d3BarChart
