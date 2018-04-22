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
      <div className="navbar-all-content">
        <div className="col-sm-6 brand-navbar">
          <span className="icon" name="icon"><i className="fas fa-tint"></i></span>
          <span className="title" name="title">fullstack</span>
        </div>
        <div className="col-sm-6 form-navbar">
          <form method="post">
            <input id="search" type="text" placeholder="BUSCA por um veículo" />
          </form>
        </div>
    </div>
		);
	}


}
