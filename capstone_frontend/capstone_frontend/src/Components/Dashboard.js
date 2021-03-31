import React, { Component } from 'react';
import AccountContainer from './AccountContainer'


export default class Dashboard extends Component {


  componentDidMount() {
    console.log("OK")
  }


  render(){
    return(
      <div>
        <div id="dashboard-name-div">SOULJABOYTELLER.COM</div>
        <h1 id="dashboard-heading">WELCOME BACK {this.props.username}</h1>
        <AccountContainer />
      </div>
    )
  }
};