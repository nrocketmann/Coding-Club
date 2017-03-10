//Raphael Gonzalez
import React, { Component } from 'react';
import Carousel from '../node_modules/nuka-carousel/index';
import './App.css';
import Ui from './Ui';
import Ui1 from './Ui';
import Ui2 from './Ui';
import Ui3 from './Ui';
import Ui4 from './Ui';
import Ui5 from './Ui';
import Ui6 from './Ui';
import Ui7 from './Ui';
import * as popup from '../../src/scripts/popup.js';
// import example from '../../example.json'
class App extends Component {

  render() {
    return (
      <div className="App">
        <Carousel speed={600}>
          <Ui title="{className}" hmwk='some stuff' tpc="{ <li></li>}" bltn={/*vehicles.map(mobile =>*/ <li>{}</li>/*)*/}/>
          <Ui1 title='Technology' hmwk='this is a different set of isnfo'/>
          <Ui2 title='Engineering'/>
          <Ui3 title='Math'/>
          <Ui4 title='History'/>
          <Ui5 title='English'/>
          <Ui6 title='Music'/>
          <Ui7 title='Thearter'/>
        </Carousel>
      </div>
    );
  }
  componentDidMount(){
    console.log(popup.getAssignments("2", "2.2.17", "2.3.17", "9a32cb28-5b21-4138-91d1-99cfcad444bd", "null"));
  }
}

export default App;
