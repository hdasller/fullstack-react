import React, { Component } from 'react';
import { Navbar  } from 'react-bootstrap';

export default class Nav extends Component {

  constructor() {

    super();
    this.state = {nome:'',email:'',senha:''};
    this.search = {};

  }

  render() {
		return (
      <Navbar>
        <span><i className="fas fa-tint"></i></span>
        <span>fullstack</span>
        <form className="pure-form pure-form-aligned"  method="post">
          <span><input id="search" type="text" placeholder="BUSCA por um veículo"/></span>
        </form>
      </Navbar>
		);
	}


}
