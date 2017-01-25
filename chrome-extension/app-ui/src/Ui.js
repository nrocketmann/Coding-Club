//Raphael Gonzalez
import React, { Component } from 'react';
import './App.css';
import Homewk from './Homewk';
import Topic from './Topic';
import Buliton from './Buliton';

class Ui extends Component {
  render () {
    return (
      <div>
        <h3 className='App-header'>{this.props.title}</h3>
        <div>
          <Homewk asmt={this.props.hmwk}/>
          <Topic tpic={this.props.tpc}/>
          <Buliton btn={this.props.bltn}/>
        </div>
      </div>
    );
  }
}

export default Ui;
