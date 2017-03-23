import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route} from 'react-router';
import $ from 'jquery';
import List from './List.jsx';
import LoginForm from './LoginForm.jsx';
import SignupForm from './SignupForm.jsx';
import CustomForm from './CustomForm.jsx';
import * as s from '../serverCalls.js'
import * as data from '../sampledata'
import ComparisonChart from './ComparisonChart.jsx'
import BubbleChart from './BubbleChart.jsx'
import BarChart from './BarChart.jsx'
import { Link } from 'react-router'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      // items: [],
      // data: data.sampledata,
      // data2: data.sampledata2,
      // explanations: data.explanations
    }

  //   this.twitterLogin = this.twitterLogin.bind(this);
  //   this.facebookLogin = this.facebookLogin.bind(this);
  }

  // componentWillMount() {
  //   this.setState({
  //     dataset: this.state.dataSet1
  //   })
  // }

  // facebookLogin() {
  //   console.log('yo')
  //   s.serverGet('facebook');
  //   //promise needs to be chained
  // }

  // twitterLogin() {
  //   s.serverGet('twitter');
  //   //promise needs to be chained
  // }



  /* formSubmit is a placeholder for functions that we will need to pass down
    to render data in a prespecified area */

          // <li><Link to="/create ">Analyze A Personality</Link></li>
          // <li><Link to="/public ">View Publicly</Link></li>
        //           <h4>description stuff, choose method below</h4>
        // <h5>tabbed logins for fb, twitter, custom</h5>
        // <a href="\facebook">yo</a>
        // <button onClick={this.facebookLogin}>facebook login</button>
        // <button onClick={this.twitterLogin}>twitter login</button>
        // <CustomForm formSubmit={this.formSubmit} />
        // <BarChart data={this.state.data.traits} />
        // <ComparisonChart data={this.state.data.traits} data2={this.state.data2.traits} />
        // <BubbleChart data={this.state.data} explanations={this.state.explanations}/>



  render () {
    return (
      <div>
        <h2>logo, menu, powered by watson</h2>
        <ul>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Signup</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
}

export default App