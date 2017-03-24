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
  console.log('props in create', props)
 return (
    <div>
  <Router>
   <div>
    <a href="\twitter">Twitter</a>
    <br></br>
    <Link to="/TwitterSearch">Twitter Account </Link>
    <Route path="/TwitterSearch" component={TwitterSearch}/>
    <br/>
    <Link to="/CustomForm">Custom Input</Link>
    <Route path="/CustomForm" component={() => <CustomForm click={props.click}/> }/>
   </div>
  </Router>
  </div>
 )
}

export default Create   