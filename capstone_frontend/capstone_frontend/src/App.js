import React, { Component } from 'react';
import './App.css';
import LogInForm from './Components/LogInForm';
import {Route, Switch} from 'react-router-dom';
import Home from "./Components/Home"
import Dashboard from "./Components/Dashboard"


export default class App extends Component {

  state = {
    username: "",
    accounts: [],
    receivedAccounts: false
  }

  getUser = (user) => {
    this.setState({ username: user })
    
    return fetch(`http://localhost:8080/getUser/${user}`)
      .then(response => response.json())
      .then(retrievedUser => {
        this.setState({ user: retrievedUser })
        fetch(`http://localhost:8080/accounts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "access_token": retrievedUser.access_token
          })
        }).then(results => results.json())
        .then(accs => {
          let checkingSavings = accs.accounts.slice(0,2);
          let loans401k = accs.accounts.slice(6,8);
          let allAccounts = checkingSavings.concat(loans401k);
          console.log(allAccounts)
          this.setState({ accounts: allAccounts })
        })
      })


  }

 

  
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" render={(routerProps) => <Home {...routerProps} getUser={this.getUser} />} />
          <Route exact path="/dashboard" render={(routerProps) => {
            return <Dashboard {...routerProps} accounts={this.state.accounts} username={this.state.username} />
          }
          } />
        </Switch>

      </div>
    )};
};
