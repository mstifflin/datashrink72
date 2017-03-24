import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js';
import BubbleChart from './BubbleChart.jsx';
import BarChart from './BarChart.jsx';
import * as globalData from '../sampledata'


class Analyses extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      dataLoaded: false,
      data: '',
      explanations: globalData.explanations
    }

  }

  componentWillMount() {
    s.analysesGet(this.props.match.params.id).then(e => {
      this.setState({
        dataLoaded: true,
        data: e.data
      })
    })
  } 

  render () {
    return (
      <div>
        {!this.state.dataLoaded ? null :
          <div>
          <BarChart data={this.state.data.traits} />
          <BubbleChart data={this.state.data} explanations={this.state.explanations}/>
          </div>
        }
      </div>
    )
  }
}

export default Analyses


