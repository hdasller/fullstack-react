import React, { Component } from 'react';
import { Navbar , NavItem, Nav } from 'react-bootstrap';

export default class CustomNav extends Component {

  constructor() {

    super();
    this.state = {nome:'',email:'',senha:''};
    this.search = {};

  }

  render() {
		return (
      <Navbar fluid="false" className="navbar-all-content">

          <div className="col-sm-6">
            <div className="navbar-brand">
              <span className="icon"><i className="fas fa-tint"></i></span>
              <span className="title">fullstack</span>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="navbar-form">
              <form method="post">
                <input id="search" type="text" placeholder="BUSCA por um veículo"/>
              </form>
            </div>
          </div>

      </Navbar>
		);
	}


}
