import React, { Component } from 'react';
import './App.css';
//import getHW from './Popup';
import Buliton from './Buliton';
import Topic from './Topic';
import Homewk from './Homewk'

class Ui extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h3>{this.props.title}</h3>
        </div>

        <Homewk asmnt={this.props.hmwk} key='data-set1'/>

        <Topic tpcs={this.props.tpc} key='data-set2'/>
        <Buliton btn={this.props.bltn} key='data-set3'/>
      </div>
    )
  }
}
export default Ui;
