import React, { Component } from 'react';
import './App.css';


export default class App extends Component {
  
  render(){
    return (
      <div className="App">
        <h1 className="login-header">Souljaboyteller.com</h1>
        <form className="login-form">
          <h2>Sign In</h2>
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="text" name="password" />
          <button id="login-button" type="submit">Sign In!</button>
        </form>

      </div>
  )};
};
