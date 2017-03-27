import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      username: '',
      password: '',
      email: '',
      status: false,
      error: false,
      errorMessage: ''
    }

    this.updateFormValue = this.updateFormValue.bind(this);
    this.sendForm = this.sendForm.bind(this);
  }

  updateFormValue(e) {
    const name = e.target.name
    this.setState({[name]: e.target.value});
  }

  validateEmail() {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.state.email);
  }

  sendForm(event) {
    event.preventDefault();
    if (this.validateEmail()) {
      s.serverPost('signup', this.state).then(e => {
        if (e.data.username) {
          this.props.update(e.data.username);
        } //TODO: error handling for when server returns an error (when e.data.error === true)
        // {error: 'Error message'}
      }).catch(e => {
        console.log(e);
        // tell user the info is correct or server is down
      });      
    } else {
      console.log('FAILED TO VALIDATE EMAIL IN SENDFORM IN SIGNUPFORM');
      //TODO: ERROR HANDLING FOR FAILED EMAIL
    }
  }

  render () {
    return (
      <div>
      <h2>Sign Up</h2>
      <p>{this.state.status}</p>
      <form onSubmit={this.sendForm}>
        <label>
          Username:
          <input type="text" name='username' onChange={this.updateFormValue} defaultValue=''/>
        </label>
        <label>
          Password:
          <input type="password" name='password' onChange={this.updateFormValue} defaultValue=''
          />
        </label>
        <label>
          Email:
          <input type="text" name='email' onChange={this.updateFormValue} defaultValue=''/>
        </label>
        <input type="submit" className="submit" defaultValue ='submit' />
      </form>
      </div>
    )
  }
}

export default SignUpForm


