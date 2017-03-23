import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js';
import BubbleChart from './BubbleChart.jsx';
import BarChart from './BarChart.jsx';
import * as globalData from '../sampledata'


class Analyses extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      dataLoaded: false,
      data: '',
      explanations: globalData.explanations
    }

    console.log(props.match.params.id)
    // this.updateFormValue = this.updateFormValue.bind(this);
    // this.sendForm = this.sendForm.bind(this);

  }


  componentWillMount() {
    console.log('here', this.props.match.params.id)
    s.analysesGet(this.props.match.params.id).then(e => {
      this.setState({
        dataLoaded: true,
        data: e.data
      })
    })
  } 


  // updateFormValue(e) {
  //   const name = e.target.name
  //   this.setState({[name]: e.target.value});
  // }

  // sendForm(event) {
  //   event.preventDefault()
  //   console.log(this.state)
  //   s.serverPost('login', this.state).then(e => {
  //     this.setState({status: e.data});
  //     console.log(e, 'yo');
  //     this.render();
  //   }).catch(e => {
  //     this.setState({status: e.data});
  //     console.log(e);
  //     this.render();
  //     //tell user the info is correct or server is down
  //   })
  // }

      // <h2>Log In</h2>
      // <p>{this.state.status}</p>
      // <form onSubmit={this.sendForm}>
      //   <label>
      //     Username:
      //     <input type="text" name='username' onChange={this.updateFormValue} defaultValue=''/>
      //   </label>
      //   <label>
      //     Password:
      //     <input type="text" name='password' onChange={this.updateFormValue} defaultValue=''
      //     />
      //   </label>
      //   <input type="submit" defaultValue ='submit' />
      // </form>

  render () {
    return (
      <div>
        {!this.state.dataLoaded ? null :
          <div>
          <BarChart data={this.state.data.traits} />
          <BubbleChart data={this.state.data} explanations={this.state.explanations}/>
          </div>
        }
      </div>
    )
  }
}

export default Analyses


