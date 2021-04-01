import React, { Component } from 'react';
import Home from './Home';
import AccountCard from "./AccountCard";



export default class AccountContainer extends Component {


  logout = () => {
    localStorage.clear();
    this.props.history.goBack()
  }

  render(){
    return(
      <div>
        <div id="main-container-div">
          <div id="main-container"> 
              {this.props.accounts.length > 0
                ? <AccountCard account={this.props.accounts[0]} />
                : null
              }
            <img id="main-pic" src="https://imgix.ranker.com/user_node_img/104/2064074/original/soulja-boy-photo-u25?auto=format&q=60&fit=crop&fm=pjpg&w=375" alt="soulja boy" />
            {this.props.accounts.length > 0
                ? <AccountCard account={this.props.accounts[1]} />
                : null
              }
          </div>
        </div>
        <div id="dashboard-footer">
          <span id="superman">SUPERMAN THAT DOUGH!</span>
          <button id="log-out-button" onClick={this.logout}>LOG OUT</button>
          <span id="bank-that">BANK THAT!</span>
        </div>
      </div>
      
    )
  }
}

