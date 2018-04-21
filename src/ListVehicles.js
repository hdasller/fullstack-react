import React, { Component } from 'react';
import BASE_URL from './config/constants.js'
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import {Card, CardText} from 'material-ui/Card';
import MODEL from './models/gql.model.js'
import InfiniteScroll from 'react-infinite-scroller';

const client = new ApolloClient(BASE_URL);
export default class ListVehicles extends Component {


  constructor() {

    super();
    this.state = {vehicles: [], hasNextPage: true};







  }

  getVehicles(page) {
    let variables = {
      "limit": 20,
      "page": page,
      "type": "veiculo",
      "query": ""
    }
    client
      .query({
        query:  gql`${MODEL.getVehicles()}`,
      variables: variables
    }).then(res=> {
          let responseVehicles = res['data']['buscaVeiculo']['edges']
          let currentlyVehicles = this.state.vehicles
          this.setState({hasNextPage: this.pageInfo = res['data']['buscaVeiculo']['pageInfo']['hasNextPage'] })
          let vehicles =  [... currentlyVehicles, ... responseVehicles ]
          this.setState({vehicles: vehicles});
          console.log("teste, ", res);
      })
  }

  render() {

    let vehicles = this.state.vehicles.map(vehicle => {
          console.log(vehicle);
          return(

   <Card style="height:700px;overflow:auto;">
   <CardText style={{'background-color': 'red', height: '6em'}}>
   <div className="card-body ">
       <div className="col-sm-9">
         <span className="card-text">{vehicle.node.marca}</span>
         <span className="card-text">{vehicle.node.modelo}</span>
         <span className="card-text">{vehicle.node.ano_modelo}</span>
       </div>
       <div className="col-sm-3">
         <span><i className="fas fa-tag"></i></span>
       </div>
   </div>
     </CardText>
   </Card>

          )
        })

		return (
      <div style={{'overflow': 'auto', height: '500px'}}>
      <InfiniteScroll
 pageStart={0}
 loadMore={this.getVehicles.bind(this)}
 hasMore={this.state.hasNextPage}
 loader={<div className="loader" key={0}>Loading ...</div>}
 useWindow={false}
>
{vehicles}
</InfiniteScroll></div>


		);
	}


}
