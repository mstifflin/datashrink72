import React from 'react';
import CustomForm from './CustomForm.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

var Create = function(props) {
 return (
    <div>
  <Router>
   <div>
    <a href="\twitter"> twitter</a>
    <Link to="/CustomForm">Custom Input</Link>
    <Route path="/CustomForm" component={CustomForm}/>
   </div>
  </Router>
  </div>
 )
}

export default Create   