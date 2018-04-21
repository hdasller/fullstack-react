import React, { Component } from 'react';
import URL from './config/constants.js'
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

const client = new ApolloClient(URL);

export default class ListVehicles extends Component {


  constructor() {

    super();
    this.state = {};
    this.vehicles = [];

    client
      .query({
        query:  gql`
        {
        __type(name: "MarcaType") {
          name
          enumValues {
            name
          }
        }
      }`
      }).then(res=> {
        console.log("teste, ", res);
      })



  }

  render() {
		return (
      this.vehicles.map(vehicle => {
        return(
          <div className="card-body ">
              <div className="col-sm-9">
                <p className="card-text">{vehicle.marca}</p>
                <p className="card-text">{vehicle.modelo}</p>
                <p className="card-text">{vehicle.ano}</p>
              </div>
              <div className="col-sm-3">
                <span><i className="fas fa-tag"></i></span>
              </div>
          </div>
        )
      })
		);
	}


}
