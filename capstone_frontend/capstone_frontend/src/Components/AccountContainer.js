import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Home from './Home'


export default class AccountContainer extends Component {


  logout = () => {
    localStorage.clear();
    this.props.history.goBack()
  }

  render(){
    return(
      <div>
        <div id="main-container"> OK HERE WE ARE</div>
        <div id="dashboard-footer">
          <span id="superman">   SUPERMAN THAT DOUGH!</span>
          <button id="log-out-button" onClick={this.logout}>LOG OUT</button>
          <span id="bank-that">BANK THAT!</span>
        </div>
      </div>
      
    )
  }
}