import React, { Component } from 'react';
import './App.css'

class Topic extends Component {
  render () {
    return (
      <div className='App-tpc'>
        <h4>Topics</h4>
        <div className='App-window'>
          <ul>{this.props.tpcs}</ul>
        </div>
      </div>
    )
  }
};

export default Topic;
