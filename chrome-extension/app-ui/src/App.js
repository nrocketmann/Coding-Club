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
/*  constructor(){
  super();
  this.state = {
    discription: [],
    items: [],
    species: [],
    vehicles:[]
    }
  }
  componentWillMount(){
  fetch('http://swapi.co/api/planets/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: items}) => this.setState({items}))
  fetch('../../src/scripts/popup.js')
  .then (responseText => responseText.json())
  .then ( ({results: className}) => this.setState({className}))
  fetch('http://swapi.co/api/species/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: species}) => this.setState({species}))
  fetch('http://swapi.co/api/vehicles/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: vehicles}) => this.setState({vehicles}))
}*/

componentWillMount(){
  fetch('https://lwhs.myschoolapp.com/api/authentication/login/?username=raphaelgonzalez19&password=1837rcg')
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
}

  render() {
  /*  let vehicles = this.state.vehicles
    let items = this.state.items
    let className = this.state.className*/

    //let discription = this.state.discription
    //let species = this.state.species
//discription.map(disc => <li>{disc.short_discription}</li>)
/*items.map(item => <li>{}</li>)*/
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
