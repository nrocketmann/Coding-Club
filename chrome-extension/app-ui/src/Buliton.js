import React, { Component } from 'react';
import './App.css'

class Buliton extends Component {
  render () {
    return (
      <div className='App-bltn'>
        <h4>buletin</h4>
        <div className='App-window'>
          {this.props.btn}
        </div>
      </div>
    )
  }
}

export default Buliton;
