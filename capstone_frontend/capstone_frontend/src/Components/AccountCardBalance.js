import React, { Component } from 'react';

export default class AccountCardBalance extends Component {

  render(){
    return(
      <div className="account-card">
        <p className="account-name">ACCOUNT NAME:</p>
        <p className="account-name-value">{this.props.account.name}</p>
        <p className="account-type">ACCOUNT TYPE:</p>
        <p className="account-type-value">{this.props.account.subtype}</p>
        <p className="account-balance">CURRENT BALANCE</p>
        <p className="account-balance-value">${this.props.account.balances["current"].toFixed(2)}</p>
      </div>
    )
  }
}