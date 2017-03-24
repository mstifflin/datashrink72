import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js';
import BubbleChart from './BubbleChart.jsx';
import BarChart from './BarChart.jsx';
import ComparisonChart from './ComparisonChart.jsx';
import * as globalData from '../sampledata'
import Public from './Public.jsx'
import Create from './Create.jsx'

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
    this.getSecondSetFromForm = this.getSecondSetFromForm.bind(this);
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
    s.analysesGet(e.target.name).then(results => { 
      this.setState({
        secondDataSet: true,
        data2: results.data
      });
    });
  }


  getSecondSetFromForm(event, state) {
    event.preventDefault()
    s.serverPost('customform', state)
    .then(e => {
      var redirectURL = e.request.responseURL;
      var hash = redirectURL.slice(redirectURL.indexOf('analyses/') + 'analyses/'.length);
      console.log('calling with', hash)
      s.analysesGet(hash).then(results => {
        console.log('getting secondData Set', results)
        this.setState({
          secondDataSet: true,
          data2: results.data
        });
      })
    }).catch(err => {
      console.log('failed', err)
    })
  }

  render () {
    return (
      <div>
        {!this.state.dataLoaded ? null :
          <div>
          <Router>
            <div>
              Compare To:
              <ul>
              <li><Link to="/Public">Public</Link></li>
              <li><Link to="/Create">Create</Link></li>
              </ul>
              <Route path="/Public" component={() => <Public click={this.getSecondSet} />} />
              <Route path="/Create" component={() => <Create click={this.getSecondSetFromForm}/> } />

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


