import React, { Component } from 'react';

export default class LogInForm extends Component {

  componentDidMount = () => {
    console.log("this is fine!")
  } 

  render(){
    return(
      <form className="login-form">
        <label>YOUUSERNAME</label>
        <input type="text" name="username" />
        <label>PASSWORD</label>
        <input type="text" name="password" />
        <button id="login-button" type="submit">Sign In!</button>
      </form>
    )
  }
}