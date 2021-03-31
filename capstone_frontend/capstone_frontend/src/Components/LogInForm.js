// import { response } from 'express';
import React, { Component } from 'react';

export default class LogInForm extends Component {

  state = {
    username: "",
    password: "",
  }

  handleSubmit = (event) => {
    event.preventDefault()
    fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          "username": this.state.username,
          "password": this.state.password
        }
        
      })
    }).then(response => response.json())
    .then(res => {
      if (!res) throw new Error ("not valid")
      
      localStorage.setItem('token', res.token)
    })

    this.props.getUser(this.state.username)
    .then(() => this.props.history.push('/dashboard'))
  }

  handleChange = (event) => {
    return event.target.name === "username"
      ? this.setState({
          username: event.target.value
        })
      : this.setState({
          password: event.target.value
      })
  }

  render(){
    return(
      <form className="login-form" onSubmit={this.handleSubmit}>
        <label>YOUUSERNAME</label>
        <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        <label>PASSWORD</label>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
        <button id="login-button" type="submit">Sign In!</button>
      </form>
    )
  }
}