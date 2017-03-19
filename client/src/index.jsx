import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import LoginForm from './components/LoginForm.jsx';
import SignupForm from './components/SignupForm.jsx';
import CustomForm from './components/CustomForm.jsx';
import * as s from './serverCalls.js'
import * as data from './sampledata'
import BubbleChart from './components/BubbleChart.jsx'
import BarChart from './components/BarChart.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      data: data.sampledata,
      explanations: data.explanations
    }

    this.twitterLogin = this.twitterLogin.bind(this);
    this.facebookLogin = this.facebookLogin.bind(this);
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
        <BarChart data={this.state.data.traits} />
        <BubbleChart data={this.state.data} explanations={this.state.explanations}/>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));