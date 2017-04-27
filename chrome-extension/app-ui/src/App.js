//Raphael Gonzalez
import React, { Component } from 'react';
import Carousel from '../node_modules/nuka-carousel/index';
//import './App.css';
import Ui from './Ui';
import Ui1 from './Ui';
import Ui2 from './Ui';
import Ui3 from './Ui';
import Ui4 from './Ui';
import Ui5 from './Ui';
import Ui6 from './Ui';
import Ui7 from './Ui';
import getAssignments as AsRaw from '../../src/scripts/popup.js';
import parseAssignmentData as AsParsed from '../../src/scripts/popup.js';
import * as popup fom '../../src/scripts/popup.js';
import Home from './Home';
import './App.css'
// import example from '../../example.json'
class App extends Component {
  componentWillMount(){
    raw = popup.getAssignments(popup.API_FILTER_ASSIGNED, new Date, new Date, function(data) {
      console.log(data);
    });
    parsed = AsParsed(raw)
  }

  render() {
    return (
      <div className="App">
        <Carousel speed={600}>
          <Home asmt={<li>{}</li>} />
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
}

export default App;
