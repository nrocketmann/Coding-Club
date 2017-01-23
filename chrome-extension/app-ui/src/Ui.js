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
          <Homewk ast={this.props.hmwk}/>
          <Topic tpic={this.props.tpc}/>
          <Buliton/>
        </div>
      </div>
    );
  }
}

export default Ui;
