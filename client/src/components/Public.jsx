import React from 'react';
import ReactDOM from 'react-dom';
import * as s from '../serverCalls.js';
import * as globalData from '../sampledata'


class Public extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      dataLoaded: false,
      data: '',
    }

    console.log(props.match.params.id)
  }

  componentWillMount() {

    this.setState({
      dataLoaded: true,
      data: globalData.sampleIds
    })



    //will issue get request to server for all the ids, will simulate through sample data
      //log it first to check
      
    // s.analysesGet('public').then(e => {
      console.log(data)
      // this.setState({
      //   dataLoaded: true,
      //   data: e.data
      // })
    // })
  } 




  render () {
    return (
      <div>
        {!this.state.dataLoaded ? null :
          <div>
            {this.state.data.map(e => {
              return <div key={e.id}><a href={`analyses/${e.id}`} >{e.person}</a></div>
            })}
          </div>
        }
      </div>
    )
  }
}

export default Public


