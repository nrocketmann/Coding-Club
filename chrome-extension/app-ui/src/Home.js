import React, { Component } from 'react';
import "./App.css";

class Home extends Component{
  render(){
    return(
      <div>
        <h1 className='App-header'>All Homework</h1>
        <div className='App-home'>
          <div className='App-window'>
            <ul>{this.props.asmt}</ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
