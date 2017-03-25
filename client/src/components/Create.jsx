import React from 'react';
import TwitterSearch from './TwitterSearch.jsx';
import CustomForm from './CustomForm.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

var Create = function(props) {
 return (
  <Router>
    <div>
    {!props.ownTwitter ? null : 
      <div>
        <a href="\twitter">My Twitter Account</a> 
        <br />
      </div>
    }
    <Link to="/TwitterSearch">Public Twitter Account</Link>
    <br />
    <Link to="/CustomForm">Custom Input</Link>
    <Route path="/TwitterSearch" component={() => <TwitterSearch click={props.otherTwitterClick}/>} />
    <Route path="/CustomForm" component={() => <CustomForm click={props.customClick} /> }/>
    </div>
  </Router>
 )
}

export default Create   