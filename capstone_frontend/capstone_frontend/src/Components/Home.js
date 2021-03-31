import React, { Component} from 'react';
import LogInForm from './LogInForm'


export default class Home extends Component {


render(){
  return(
    <div>
      <h1 className="login-header-1">SOULJABOYTELLER.COM</h1>
      <img id="crank-dat-gif" src="https://media.giphy.com/media/DBGvqaeMvPU5i/giphy.gif" alt="Soulja Boy Dance!" />
      <h2 className="login-header-2">Sign In</h2>
      <LogInForm history={this.props.history} getUser={this.props.getUser}/>
    </div>
  )
}





}