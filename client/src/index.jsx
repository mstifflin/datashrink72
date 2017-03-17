import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import CustomForm from './components/CustomForm.jsx';
import Chart from  './components/Chart.jsx'
import * as s from './serverCalls.js'
import sampledata from './sampledata'
import BarChart from './components/BarChart.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      data: sampledata.traits,
      dataset: null,
      dataSet1: [
        {id: '5fbmzmtc', x: 25, y: 41, z: 5},
        {id: 's4f8phwm', x: 45, y: 45, z: 5},
      ],
      dataSet2: [
        {id: '5fbmzmtc', x: 55, y: 55, z: 10},
        {id: 's4f8phwm', x: 65, y: 65, z: 10},
      ],
      domain: {x: [25, 75], y: [0, 100]}
    }

    this.alternatePage = this.alternatePage.bind(this)
    this.facebookLogin = this.facebookLogin.bind(this)
  }

  componentWillMount() {
    this.setState({
      dataset: this.state.dataSet1
    })
  }

  facebookLogin() {
    console.log('yo')
    s.serverGet('facebook');
    //promise needs to be chained
  }

  twitterLogin() {
    s.serverGet('twitter');
    //promise needs to be chained
  }

  alternatePage(e) {
    console.log(this.state.dataset);
    e.preventDefault()
      if (this.state.dataset === this.state.dataSet1) {
        this.setState({
          dataset: this.state.dataSet2
        })
      } else {
        this.setState({
          dataset: this.state.dataSet1
        })
      }
  }




  /* formSubmit is a placeholder for functions that we will need to pass down
    to render data in a prespecified area */

  render () {
    return (
      <div>
        <h2>logo, menu, powered by watson</h2>
          <LoginForm formSubmit={this.formSubmit}/>
          <SignupForm formSubmit={this.formSubmit}/>
        <h4>description stuff, choose method below</h4>
        <h5>tabbed logins for fb, twitter, custom</h5>
        <a href="\facebook">yo</a>
        <button onClick={this.facebookLogin}>facebook login</button>
        <button onClick={this.twitterLogin}>twitter login</button>
        <CustomForm formSubmit={this.formSubmit} />
        <div>
          <p>
          {'Pages: '}
          <a href="#" onClick={this.alternatePage}>Previous</a>
          </p>
        <Chart
          data={this.state.dataset}
          domain={this.state.domain} />
        </div>
        <div>
        <BarChart data={this.state.data} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));