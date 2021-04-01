import React, { Component } from 'react';
import AccountContainer from './AccountContainer'


export default class Dashboard extends Component {


  render(){
    return(
      <div>
        <div id="dashboard-name-div">SOULJABOYTELLER.COM</div>
        <h1 id="dashboard-heading">WELCOME BACK {this.props.username}</h1>
        <AccountContainer history={this.props.history} showImage={this.showImage} accounts={this.props.accounts} />
      </div>
    )
  }
};