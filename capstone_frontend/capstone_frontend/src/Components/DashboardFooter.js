import React, { Component } from 'react';

export default class DashboardFooter extends Component{

  render(){
    return(
      <div id="dashboard-footer">
        <button id="log-out-button" onClick={this.props.logout}>LOG OUT</button>
        <p className="contact">TO CONTACT, KISS US THROUGH THE PHONE: (281)330-8004</p>
      </div>
    )
  }
}