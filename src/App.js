import React, { Component } from 'react';
import './App.css';
import Nav from './Navbar';
import ListVehicles from './ListVehicles';
import Details from './Details';
import DialogExampleModal from './Exemplo';

class App extends Component {


  render() {
    return (
      <div>
      <Nav></Nav>
      <ListVehicles></ListVehicles>
      <Details></Details>
      <DialogExampleModal></DialogExampleModal>
      </div>
    );
  }
}

export default App;
  
