import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js';
import BubbleChart from './BubbleChart.jsx';
import BarChart from './BarChart.jsx';
import ComparisonChart from './ComparisonChart.jsx';
import * as globalData from '../sampledata'
import Public from './Public.jsx'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Analyses extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      dataLoaded: false,
      data: '',
      explanations: globalData.explanations,
      secondDataSet: false,
      data2: ''

    }
    this.getSecondSet = this.getSecondSet.bind(this);
  }

  componentWillMount() {
    s.analysesGet(this.props.match.params.id).then(e => {
      this.setState({
        dataLoaded: true,
        data: e.data
      })
    })
  } 

  getSecondSet(e) {
    e.preventDefault();
    console.log('E E E: ', e);
    console.log(e.target.name);
    s.analysesGet(e.target.name).then(e => { 
      this.setState({
        secondDataSet: true,
        data2: e.data
      });
    });
  }

  render () {
    return (
      <div>
        {!this.state.dataLoaded ? null :
          <div>
          <Router>
            <div>
              <Link to="/Public">Compare To:</Link>
              <Route path="/Public" component={() => <Public click={this.getSecondSet} />} />
            </div>
          </Router>
          {!this.state.secondDataSet ? null :
            <ComparisonChart data={this.state.data.traits} data2={this.state.data2.traits} /> }
          <BarChart data={this.state.data.traits} />
          <BubbleChart data={this.state.data} explanations={this.state.explanations}/>
          </div>
        }
      </div>
    )
  }
}

export default Analyses


