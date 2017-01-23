import React, { Component } from 'react';
import './App.css';

class Homewk extends Component {
  render () {
    return (
      <div className='App-asmt'>
        <h4>Assignments</h4>
        <div className='App-window' hw={this.props.ast}>
          {this.props.hw}
        </div>
      </div>
    )
  }
}

export default Homewk;
