import * as d3 from 'd3';

var d3BarChart = {};

d3BarChart.create = function(el, data) {

/*d3.select('.chart') works just like jquery
    .selectAll('div')
    .data(data)     
    .enter().append("div)")   
    
    //this creates a div for each membery of data

      .style("width", function(d) { return d * 10 + "px"})
      .text(function(d) { return d; })

    //this adds style of width d (d is each element) and multiplies by 10
    //then adds text returnin d
    
    if you need to create a function to scale, use scale.linear()

    var x = d3.scale.linear()
      .domain([0, d3.max(data)])
      .range([0, 420])

    now you can use .style("width", function(d) { return x(d) + "px"})
    

    svg uses fille instead of background-color and other differences
    also elements positioned relative to top left corner
*/

  var width = 1000
  var barHeight = 20;

  var x = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 500])

  var y = d3.scaleLinear()
    .domain([0, 52])
    .range([0, barHeight * data.length])

  var svg = d3.select(el).append('svg')
      .attr('class', 'd4')
      .attr('width', width)
      .attr('height', barHeight * data.length);

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
      .attr("x", function(d) { return -130  })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) {
        //take the trait_id , get rid of the first underscore & before
        //pad it to 30
        let trait = d.trait_id;
        trait = trait.slice(trait.indexOf('_') + 1);
        trait = '|' + ' '.repeat(30 - trait.length) + trait;
        // console.log('how many', ' '.repeat(40 - trait.length) , 'thismany')
        return trait + ' : ' + Math.round(d.percentile * 100);
      });
};

// d3Chart.update = function(el, state) {
//   // Re-compute the scales, and render the data points
//   var scales = this._scales(el, state.domain);
//   this._drawPoints(el, scales, state.data);
// };


// d3Chart._scales = function(el, state) {

//   if (!state) {
//     return null;
//   }

//   var width = el.offsetWidth;
//   var height = el.offsetHeight;

//   console.log(width, height)

//   var x = d3.scaleLinear()
//     .domain(state.x)
//     .range([0, 100]);

//   var y = d3.scaleLinear()
//     .domain(state.y)
//     .range([height, 0]);

//   var z = d3.scaleLinear()
//     .domain([1, 10])
//     .range([1, 10]);

//   return {x: x, y: y, z: z};
// }

// d3Chart.destroy = function(el) {
//   // Any clean-up would go here
//   // in this example there is nothing to do
// };

// d3Chart._drawPoints = function(el, scales, data) {
//   // //we will pass in data...
//   // var g = d3.select(el).selectAll('.d3-points');

//   // var point = g.selectAll('.d3-point')
//   //   .data(data, function(d) { return d.id; });

//   // // ENTER
//   // point.enter().append('circle')
//   //     // .style('fill', 'steelblue')
//   //     .attr('class', 'd3-point')
//   //     // .attr('cx', 5)
//   //     // .attr('cy', 5)
//   //     // .attr('r', 5)

//   // // ENTER & UPDATE
 
//   //     .attr('cx', function(d) { return scales.x(d.x); })
//   //     .attr('cy', function(d) { return scales.y(d.y); })
//   //     .attr('r', function(d) { return scales.z(d.z); });


//   // // EXIT
//   // point.exit()
//   //     .remove();
// };

export default d3BarChart
