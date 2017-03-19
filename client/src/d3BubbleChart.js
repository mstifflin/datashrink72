import * as d3 from 'd3';

var d3BubbleChart = {};
d3BubbleChart.create = function(el, dataOrig, explanations) {
  var dataCopy = JSON.stringify(dataOrig);
  var data = JSON.parse(dataCopy)
  data['children'] = data['traits'];
  //d3's layout wants a 'children property'

  var colorCodes = {
    facet: '#79872b',
    big5: '#145b57',
    need: '#a55d22',
    value: '#a0558d'
  }

  //set dimensions of the chart
  var svg = d3.select(el).append('svg')
    .attr('width', 1250)
    .attr('height', 1250)
    .attr('background', '#293950');
  
  //fill in rectangle
  svg.append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("fill", '#293950');

  //packs in the circles
  var rootV = d3.hierarchy(data)
  rootV
    .sum(function(d) {
      return 500 * d.percentile + 15;
    })
    .sort(function(a, b) {
      // the below can be used for sorting ascending or descending
      // which puts all the small bubbles outside or inside
        // return b.value - a.value  
      return Math.random() -.5
    }) 

  var pack = d3.pack(rootV)
    // .sum(function(d) {  })
    .size([1250, 1250])

    .padding(8);
  
  //sets up each point after packing
  var node = svg.selectAll('g')
    .data(pack(rootV).leaves())
    .enter()
    .append('g')
    .attr('class', 'bubbleNode')
    .attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });

  //creates a circle at each point, with radius r
  node
    .append('circle')
    .attr('r', function(d) { return d.r; })
    .attr('fill', function(d) {

      var fullTrait = d.data.trait_id;
      var colorGroup = fullTrait.slice(0, fullTrait.indexOf('_'))
      return colorCodes[colorGroup];
    });
  
  node
    .append("text")
    .attr("text-anchor", "middle")
    .text(function(d){ 
       if (d.data.percentile * 100 > 15) {
         return d.data.name.toUpperCase();
       } else {
         return d.data.name.slice(0,3).toUpperCase() + '...';            
       }
     });

  node
    .append("text")
    .attr("y", function(d){ return 15; })
    .attr("text-anchor", "middle")
    .text(function(d){ 
       return Math.round(d.data.percentile * 10000) / 100; })
    .attr("text-anchor", "middle");

  node
    .append('title')
    .text(function(d) { 
      return d.data.name + ': ' + Math.round(d.data.percentile * 10000) / 100 +
        (explanations[d.data.name] ? '\n\n' + explanations[d.data.name] : '')
    });

  svg.append("g").append('text')
      .attr("x", 30)             
      .attr("y", 30)
      .attr('class', 'bubbleTitle')
      .text("TWITTER PERSONALITY ANALYSIS");
};

export default d3BubbleChart


