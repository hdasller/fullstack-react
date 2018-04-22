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
import IconButton from 'material-ui/IconButton';

class App extends Component {


  render() {
    return (
      <MuiThemeProvider>
      <div>
        <CustomNav></CustomNav>

        <div className="container">
          <div className="row">
            <PageHeader className="vehicles-header">
                <span name="title">VEÍCULO</span>

              <span name="icon"><IconButton
                iconClassName="fas fa-plus-circle"
                tooltip="Criar novo veículo"
                tooltipPosition="top-left"
                iconStyle={{color:'#45535A' }}
                />
            </span>
            </PageHeader>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <ListVehicles></ListVehicles>

            </div>
            <div className="col-sm-6">
              <Details></Details>
            </div>
          </div>

        </div>

      <DialogExampleModal></DialogExampleModal>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
