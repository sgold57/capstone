import React, { Component } from 'react';
import './App.css';


export default class App extends Component {
  
  render(){
    return (
      <div className="App">
      <h1 className="login-header-1">SOULJABOYTELLER.COM</h1>
      <img id="crank-dat-gif" src="https://media.giphy.com/media/DBGvqaeMvPU5i/giphy.gif" />
      <h2 className="login-header-2">Sign In</h2>
      <form className="login-form">
        <label>YOUUSERNAME</label>
        <input type="text" name="username" />
        <label>PASSWORD</label>
        <input type="text" name="password" />
        <button id="login-button" type="submit">Sign In!</button>
      </form>

    </div>
  )};
};
