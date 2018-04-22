import React, { Component } from 'react';
import BASE_URL from './config/constants.js';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import {Card, CardText} from 'material-ui/Card';
import MODEL from './models/gql.model.js'
import InfiniteScroll from 'react-infinite-scroller';
import PubSub from 'pubsub-js';
import SelectMark from './SelectType.js'
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

const client = new ApolloClient(BASE_URL);

export default class ListVehicles extends Component {


  constructor() {

    super();
    this.state = {vehicles: [], hasNextPage: true};
  }

  changeDetails(ctx, vehicles){
    console.log("vehicles onclick", vehicles);
    PubSub.publish('changeDetails', vehicles);
  }

  getVehicles(page) {
    let variables = {
      "limit": 5,
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
          this.setState({hasNextPage: res['data']['buscaVeiculo']['pageInfo']['hasNextPage'] })
          let vehicles =  [... currentlyVehicles, ... responseVehicles ]
          this.setState({vehicles: vehicles});
          console.log("teste, ", res);
      })
  }

  render() {

    let vehicles = this.state.vehicles.map(vehicle => {
          console.log(vehicle);
          return(
            <span>
              <ListItem
                button
                rightIcon={         <IconButton
                          iconClassName="fas fa-trash-alt"
                          tooltip="Remover Veículo"
                          tooltipPosition="top-left"
                          iconStyle={{color:'#45535A' }}
                          />}
                onClick={(e) => this.changeDetails(e, vehicle.node)}>
                  <span className="card-text">{vehicle.node.marca}</span>
                  <span className="card-text">{vehicle.node.modelo}</span>
                  <span className="card-text">{vehicle.node.ano_modelo}</span>

              </ListItem>
                <Divider />
            </span>





          )
        })




		return (
      <div style={{'overflow': 'auto', height: '500px'}}>
      <InfiniteScroll
         pageStart={0}
         loadMore={this.getVehicles.bind(this)}
         hasMore={this.state.hasNextPage}
         useWindow={false}
      >
    <Card>
    <CardText>
      <List component="nav"  >
        {vehicles}

       </List>
      </CardText>
    </Card>


</InfiniteScroll></div>
		);
	}


}
