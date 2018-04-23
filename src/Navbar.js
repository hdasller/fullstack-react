import React, { Component } from 'react';
import { Navbar , NavItem, Nav } from 'react-bootstrap';
import PubSub from 'pubsub-js';

export default class CustomNav extends Component {

  constructor() {

    super();
    this.state = {nome:'',email:'',senha:''};
    this.search = {};

  }

  /**
   *  This method loads one of the vehicles in the search input change
   */

  loadVehiclesByKey(event){
    console.log(event.target.value);
    PubSub.publish('findByKey', event.target.value);
  }

  render() {
		return (
      <div className="navbar-all-content">
        <div className="col-sm-6 brand-navbar">
          <span className="icon" name="icon"><i className="fas fa-tint"></i></span>
          <span className="title" name="title">fullstack</span>
        </div>
        <div className="col-sm-6 form-navbar">
            <input onChange={this.loadVehiclesByKey.bind(this)} id="search" type="text" placeholder="BUSCA por um veículo" />
        </div>
    </div>
		);
	}


}
