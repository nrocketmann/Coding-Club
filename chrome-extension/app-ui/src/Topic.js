import React, { Component } from 'react';
import './App.css';

class Topics extends Component {
  render () {
    return (
      <div className='App-tpc'>
        <h4>Topics</h4>
        <div className='App-window' tpcs={this.props.tpic}>
          {this.props.tpcs}
        </div>
      </div>
    )
  }
}

export default Topics;
