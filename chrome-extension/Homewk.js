import React, { Component } from 'react';
//import Popup from 'Popup.js';
import './App.css';

class Homewk extends Component {
  render () {
    return (
      <div className='App-asmt'>
        <h4>Assignments</h4>
        <div className="App-window">
          <ul>{this.props.asmnt}</ul>
        </div>
      </div>
    )
  }
}

export default Homewk;
