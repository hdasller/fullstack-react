import React, { Component } from 'react';
import './App.css';
import Nav from './Navbar';
import ListVehicles from './ListVehicles';
import Details from './Details';
import DialogExampleModal from './Exemplo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {


  render() {
    return (
      <MuiThemeProvider>
      <div>
      <Nav></Nav>
      <ListVehicles></ListVehicles>
      <Details></Details>
      <DialogExampleModal></DialogExampleModal>
      </div>
      </MuiThemeProvider>

    );
  }
}

export default App;
