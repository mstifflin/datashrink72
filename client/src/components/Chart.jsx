import d3Chart from '../d3Chart';
import React from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';


var Chart = React.createClass({
  propTypes: {
    data: React.PropTypes.array,
    domain: React.PropTypes.object
  },

  componentDidMount: function() {
    var el = ReactDOM.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());

  },

  componentDidUpdate: function() {
    d3.select('svg').remove();

    // var el = ReactDOM.findDOMNode(this);

    // d3Chart.update(el, this.getChartState());
    // console.log('updating');
    // console.log(this.getChartState())
    // d3.select('svg').remove();

    var el = ReactDOM.findDOMNode(this);
    d3Chart.create(el, {
      width: '100%',
      height: '300px'
    }, this.getChartState());

  },

  getChartState: function() {
    return {
      data: this.props.data,
      domain: this.props.domain
    };
  },

  // componentWillUnmount: function() {
  //   var el = ReactDOM.findDOMNode(this);
  //   d3Chart.destroy(el);
  // },

  render: function() {
    return (
      <div className="Chart"></div>
    );
  }
});

export default Chart