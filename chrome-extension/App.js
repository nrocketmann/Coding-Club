//imports
import React, { Component } from 'react';
import './App.css';
//import Popup from './Popup';
import Ui from './Ui';
import Ui1 from './Ui';
import Ui2 from './Ui';
import Ui3 from './Ui';
import Ui4 from './Ui';
import Ui5 from './Ui';
import Ui6 from './Ui';
import Ui7 from './Ui';
import Carousel from '../node_modules/nuka-carousel/index';

class App extends Component {
  constructor(){
  super();
  this.state = {
    items: [],
    people: [],
    species: []}
  }
  componentWillMount(){
  fetch('http://swapi.co/api/planets/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: items}) => this.setState({items}))
  fetch('http://swapi.co/api/people/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: people}) => this.setState({people}))
  fetch('http://swapi.co/api/people/?format=json')
  .then (responseText => responseText.json())
  .then ( ({results: species}) => this.setState({species}))
  }
  render() {
    let items = this.state.items
    let people = this.state.people
    let species = this.state.species
    return (
      <div>
        <Carousel speed={600}>
          <Ui key="zero" title='Science' hmwk={people.map(person => <li>{person.name}</li>)} tpc={items.map(item => <li>{item.name}</li>)} bltn={species.map(type => <li>{type.name}</li>)}/>
          <Ui1 title='Technology' hmwk='this is a different set of isnfo'/>
          <Ui2 title='Engineering'/>
          <Ui3 title='Math'/>
          <Ui4 title='History'/>
          <Ui5 title='English'/>
          <Ui6 title='Music'/>
          <Ui7 title='Thearter'/>
        </Carousel>
      </div>
    )
  }  
}
export default App;
