import * as d3 from 'd3';
var reorder = require('./d3order.js')

var d3ComparisonChart = {};
d3ComparisonChart.create = function(el, data1, data2) {
  //modify width of chart and height of lines
  // console.log('data being input', data1, data2)
  var totalWidth = 1250;
  var barHeight = 35;

  var sortedData1 = reorder(data1.traits);
  var sortedData2 = reorder(data2.traits);

  var data1Name = data1.name;
  var data2Name = data2.name;


  //abstract somewhere
  const twoDecFormat = (n) => parseFloat(Math.round(n * 10000) / 100).toFixed(2);

  //scaleLinear will modify the data to a range based on the domain
    //then scale each input to a range specified on the range

  var margin = {top: 100, right: 15, bottom: 15, left: 15};
  var padding = {top: 0, right: 0, bottom: 0, left: 0};

  var outerWidth = totalWidth;
  var outerHeight = barHeight * sortedData1.length + margin.top + margin.bottom + padding.top + padding.bottom;
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
    .range([0, 450])

  //theres 53 inputs..
  var y = d3.scaleLinear()
    .domain([0, 52])
    .range([0, barHeight * sortedData1.length])

  var svg = d3.select(el).append('svg')
    .attr('class', 'comparisonChart')
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // pass in title as prop w/user
  svg.append("g")
  svg.append("text")
      .attr('x', width / 2)
      .style("text-anchor", "middle")
      .attr('class', 'bubbleTitle')
      .attr('y', -50)
      .text('vs')

  svg.append("text")
    .attr('x', width / 2 + 80)
    .attr('class', 'bubbleTitle')
    .attr('y', -50)
    .text(data2Name)

  svg.append("text")
    .attr('x', width / 2 - 80)
    .style('text-anchor', 'end')
    .attr('class', 'bubbleTitle')
    .attr('y', -50)
    .text(data1Name)
  
  var bar = svg.selectAll('.data2')
    .data(sortedData2)
    .enter().append('g')
    .attr('class', 'sortedData2')
    .attr("transform", (d,i) => `translate(0, ${i * barHeight})`)

    bar.append("rect")
      .attr("transform", (d, i) => `translate( ${width/ 2 + 80} ,0)`)
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
        return width/2 + 85
      })
      .attr('y', barHeight / 2)
      .attr('dy', ".35em")
      .style('fill', 'white')
      .text(function(d) {
        return twoDecFormat(d.percentile);
      });


    bar.append("text")
      .attr("x", function(d) { 
        return width / 2;
      })
      .attr("y", barHeight / 2)
      .style("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr('class', 'barChartLabels')
      .text(function(d) {
        let trait = d.trait_id;
        trait = trait.slice(trait.indexOf('_') + 1).replace(/\_/g, ' ');
        return trait;
      });

    var bar = svg.selectAll('.data1')
      .data(sortedData1)
      .enter().append('g')
      .attr('class', 'data1')
      .attr("transform", (d,i) => {
        var w = x(d.percentile * 100);
        return `translate(${width / 2 - 85 - w}, ${i * barHeight})`
      });


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
          return x(d.percentile * 100) - 45;
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
              return `translate(1150, ${i * 15 -75} )`;
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

export default d3ComparisonChart
