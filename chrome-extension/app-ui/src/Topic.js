import React, { Component } from 'react';
import './App.css';

class Topics extends Component {
  render () {
    return (
      <div className='App-tpc'>
        <h4>Topics</h4>
        <div className='App-window' >
          <ul>{this.props.tpic}</ul>
        </div>
      </div>
    )
  }
}

export default Topics;
