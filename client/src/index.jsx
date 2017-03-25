import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Create from './components/Create.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import ComparisonChart from './components/ComparisonChart.jsx'
import Analyses from './components/Analyses.jsx'
import Public from './components/Public.jsx'
import UserAnalyses from './components/UserAnalyses.jsx'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 'guest',  //should be changed to username when logged in
      loggedIn: false,
    }
  }

  render () {
    return (
      <Router>
        <div>
          <h1>DATASHRINK</h1>
          WELCOME, {this.state.user}
          <ul>
            <li><Link to="/Home">Home</Link></li>
            <li><Link to="/LoginForm">Log In</Link></li>
            <li><Link to="/SignUpForm">Sign Up</Link></li>
            <li><Link to="/Create">Create Analysis</Link></li>
            <li><Link to="/Public">Public Analyses</Link></li>
            <li><Link to="/UserAnalyses">My Stored Analyses</Link></li>
          </ul>

          <Route path="/Home" />
          <Route path="/LoginForm" component={LoginForm} />
          <Route path="/SignUpForm" component={SignupForm}/>
          <Route path="/Create" component={() => <Create ownTwitter="true"/>} />
          <Route path="/Public" component={Public}/>
          <Route path="/UserAnalyses" component={UserAnalyses}/>
          <Route path="/analyses/:id" component={Analyses} />
        </div>
      </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));