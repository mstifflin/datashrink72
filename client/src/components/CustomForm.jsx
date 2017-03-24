import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'


class CustomForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      name: '',
      text: ''
    }
    this.updateFormValue = this.updateFormValue.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  updateFormValue(e) {
    const name = e.target.name
    this.setState({[name]: e.target.value});
  }

  sendForm(event) {
    event.preventDefault()
    s.serverPost('customform', this.state)
    .then(e => {
      window.location.href = e.request.responseURL;
    }).catch(e => {
      console.log('error', e);
    })
  }

  render () {
    return (
      <div>
      <h2>Enter your own input to analyze</h2>
      <form onSubmit={this.sendForm}>
        <label>
          Name your input
          <p></p>
          <input type="text" name='name' onChange={this.updateFormValue} defaultValue=''/>          
          <p></p>
        </label>
        <textarea rows='30' cols='60' name='text' onChange={this.updateFormValue} defaultValue=''/>
        <input type="submit" defaultValue ='submit'/>
      </form>
      </div>
    )
  }
}


export default CustomForm

