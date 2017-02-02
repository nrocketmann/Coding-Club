//Raphael Gonzalez
import React, { Component } from 'react';
import './App.css';
//import '../../src/scripts/popup.js';

class Homewk extends Component {
  render () {
    return (
      <div className='App-asmt'>
        <h4>Assignments</h4>
        <div className='App-window'>
          <ul>{this.props.asmt}</ul>
        </div>
      </div>
    )
  }
}

export default Homewk;
