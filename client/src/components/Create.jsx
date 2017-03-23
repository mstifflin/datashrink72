import React from 'react';
import CustomForm from './CustomForm.jsx';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

var Create = function(props) {
 return (
  <Router>
   <div>
    <Link to="/CustomForm">Custom Input</Link>
    <Route path="/CustomForm" component={CustomForm}/>
   </div>
  </Router>
 )
}

export default Create