// import './App.css';
import React, { Component } from 'react';

class App extends Component {


  handleClick = () => {
    fetch('https://api.teller.io/accounts --auth test_BABfg5yAmWyFO0fdXFaDmw:')
      .then(response => response.json())
      .then(results => console.log(results))
  }
  
  
  render(){
    return (
      <div className="App">
        <button id="teller-connect" onClick={this.handleClick}>Connect To Bank</button>
    </div>
  )}
}

export default App;
