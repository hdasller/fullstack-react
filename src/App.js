import React, { Component } from 'react';
import './App.css';
import CustomNav from './Navbar';
import ListVehicles from './ListVehicles';
import Details from './Details';
import MutationModal from './MutationModal';
import DeleteModal from './DeleteModal';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { PageHeader } from 'react-bootstrap';
import {GridList, GridTile} from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import PubSub from 'pubsub-js';

class App extends Component {

  /**
   * [goCreateVehicle description]
   * This method send a broadcast message to open a create vehicle modal.
   */

  goCreateVehicle(){
    PubSub.publish('openDialogCreate');
  }

  render() {
    return (
      <MuiThemeProvider>
      <div>
        <CustomNav></CustomNav>

        <div className="container">
          <div className="row">
            <PageHeader className="vehicles-header">
                <span name="title">VEÍCULO</span>

              <span onClick={this.goCreateVehicle.bind(this)} name="icon"><IconButton
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
              <ListVehicles name="list-vehicles"></ListVehicles>

            </div>
            <div className="col-sm-6">
              <Details></Details>
            </div>
          </div>

        </div>

      <MutationModal></MutationModal>
        <DeleteModal></DeleteModal>

      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
