import React, { Component } from 'react';
import AccountCardBalance from "./AccountCardBalance";
import AccountCardInvestment from "./AccountCardInvestment";
import AccountCardLoan from "./AccountCardLoan";

import DashboardFooter from "./DashboardFooter"




export default class AccountContainer extends Component {


  logout = () => {
    localStorage.clear();
    this.props.history.goBack()
  }

  render(){
    return(
      <div>
        <div id="main-container">
            <div id="container-div-left"> 
                {this.props.accounts.length > 0
                  ? <AccountCardBalance account={this.props.accounts[0]} />
                  : null
                }
                {this.props.accounts.length > 0
                  ? <AccountCardBalance account={this.props.accounts[1]} />
                  : null
                }
            </div>
            <div id="container-div-middle">
              <span id="superman">SUPERMAN THAT DOUGH!</span>
              <img id="main-pic" src="https://imgix.ranker.com/user_node_img/104/2064074/original/soulja-boy-photo-u25?auto=format&q=60&fit=crop&fm=pjpg&w=375" alt="soulja boy" />
              <span id="bank-that">BANK THAT!</span>
            </div>
            <div id="container-div-right">
              {this.props.accounts.length > 0
                ? <AccountCardInvestment account={this.props.accounts[2]} />
                : null
              }
              {this.props.accounts.length > 0
                ? <AccountCardLoan account={this.props.accounts[3]} />
                : null
              }
            </div>
          </div>
          <DashboardFooter logout={this.logout} />
        </div>   
      )
    }
  }



  