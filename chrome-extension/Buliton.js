import React, { Component } from 'react';
import './App.css';

class Buliton extends Component {
  render () {
    return (
      <div className='App-bltn'>
       <h4>bulletin</h4>
         <div className="App-window">
           <ul>{this.props.btn}</ul>
         </div>
       </div>
    )
  }
};

export default Buliton;
