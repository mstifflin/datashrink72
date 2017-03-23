import React from 'react';
import ReactDOM from 'react-dom';

import $ from 'jquery';
import List from './components/List.jsx';
import Create from './components/Create.jsx';

import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import CustomForm from './components/CustomForm.jsx';
import * as s from './serverCalls.js'
import * as data from './sampledata'
import ComparisonChart from './components/ComparisonChart.jsx'
import RouteWithProps from './components/FadingRoute.jsx'
import Analyses from './components/Analyses.jsx'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'guest', 
      logged: true,
      stuff: 'hello',
      items: ['one', 'two'],
      data: data.sampledata,
      data2: data.sampledata2,
      explanations: data.explanations
    }

    // this.twitterLogin = this.twitterLogin.bind(this);
    // this.facebookLogin = this.facebookLogin.bind(this);
    this.changeUserName = this.changeUserName.bind(this);
  }


  changeUserName() {
    var names = ['hello', 'bob', 'nancy']
    this.setState({
      user: names[Math.floor(Math.random() * 3)]
    })

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


        // <h4>description stuff, choose method below</h4>
        // <h5>tabbed logins for fb, twitter, custom</h5>
        // <a href="\facebook">yo</a>
        // <button onClick={this.facebookLogin}>facebook login</button>
        // <button onClick={this.twitterLogin}>twitter login</button>
        // <CustomForm formSubmit={this.formSubmit} />
        // <BubbleChart data={this.state.data} explanations={this.state.explanations}/>



  /* formSubmit is a placeholder for functions that we will need to pass down
    to render data in a prespecified area */

            // <li><Link to="/SignupForm">SignupForm</Link></li>

// analyze/x/
// ->server sends index.html
// then client asks for analysis/x 
//   -> sent get request to server, sends back files

  render () {
    return (
      <Router>
        <div>
          <h1>DATASHRINK</h1>
          <ul>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/LoginForm">Log In</Link></li>
            <li><Link to="/SignUpForm">Sign Up</Link></li>
            <li><Link to="/Create">Create Analysis</Link></li>
            <li><Link to="/Public">Public Analyses</Link></li>
          </ul>

  

          <Route path="/Home" />
          <Route path="/LoginForm" component={() => this.state.logged ? <LoginForm /> : null} />
          <Route path="/SignUpForm" component={SignupForm}/>
          <Route path="/Create" render={() => <Create {...this.state} /> } />
          <Route path="/Public" />
          <Route path="/analyses" component={Analyses} />
          <Route path="/analyses/*" component={Analyses} />

        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));