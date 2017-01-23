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
import Ui7 from './Ui'

class App extends Component {
  constructor(){
  super();
  this.state = {
    items: [],
    discription: [],
    species: [],
    vehicles:[]
    }
  }
  componentWillMount(){
  fetch('http://swapi.co/api/planets/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: items}) => this.setState({items}))
  fetch('https://lwhs.myschoolapp.com/api/DataDirect/AssignmentCenterAssignments/?format=json&persona=2&filter=2&dateStart=1.16.17&dateEnd=1.18.17&t=b406c1d7-2cb0-46ac-9efe-a683ca633df5')
  .then (responseText => responseText.json())
  .then ( ({results: discription}) => this.setState({discription}))
  fetch('http://swapi.co/api/species/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: species}) => this.setState({species}))
  fetch('http://swapi.co/api/vehicles/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: vehicles}) => this.setState({vehicles}))
  }
  render() {
    let vehicles = this.state.vehicles
    let items = this.state.items
    let discription = this.state.discription
    //let species = this.state.species

    return (
      <div className="App">
        <Carousel speed={600}>
          <Ui title='Science' hmwk={discription.map(disc => <li>{disc.short_discription}</li>)} tpc={items.map(item => <li>{item.name}</li>)} bltn={vehicles.map(mobile => <li>{mobile.name}</li>)}/>
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
