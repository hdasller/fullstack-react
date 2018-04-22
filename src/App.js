import React, { Component } from 'react';
import './App.css';
import CustomNav from './Navbar';
import ListVehicles from './ListVehicles';
import Details from './Details';
import DialogExampleModal from './Exemplo';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { PageHeader } from 'react-bootstrap';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
class App extends Component {


  render() {
    return (
      <MuiThemeProvider>
      <div>
      <CustomNav></CustomNav>


        <div class="container">
          <PageHeader>
              <span>VEÍCULO</span>
            <span><i class="fas fa-plus-circle"></i></span>
          </PageHeader>

          <GridList
            cellHeight={400}
              cols={2}
          >
              <GridTile
              >
              <Subheader>December</Subheader>

              <ListVehicles></ListVehicles>

              </GridTile>
              <GridTile
              >
              <Subheader>December</Subheader>

              <Details></Details>


              </GridTile>
          </GridList>
        </div>
      <DialogExampleModal></DialogExampleModal>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
