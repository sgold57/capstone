// import { response } from 'express';
import React, { Component } from 'react';

export default class LogInForm extends Component {

  state = {
    username: "",
    password: "",
    newUser: false
  }

  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.newUser)
    
    if(!this.state.newUser){
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
    } else {
      this.setState({newUser: false})
      fetch("http://localhost:8080/api")
        .then(response => response.json())
        .then(accessToken => {
          console.log(accessToken.access_token)
          fetch("http://localhost:8080/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: {
                "username": this.state.username,
                "password": this.state.password,
                "access_token": accessToken.access_token
              }
            })
          })
        })
    }
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
        <button id="signup-button" onClick={() => this.setState({newUser: true})} type="submit">Sign Up!</button>
      </form>
    )
  }
}