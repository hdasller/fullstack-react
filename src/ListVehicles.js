import React, { Component } from 'react';
import BASE_URL from './config/constants.js';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import {Card, CardText} from 'material-ui/Card';
import MODEL from './models/gql.model.js'
import InfiniteScroll from 'react-infinite-scroller';
import PubSub from 'pubsub-js';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemText } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';

const client = new ApolloClient(BASE_URL);

export default class ListVehicles extends Component {


constructor() {

  super();
  this.state = {
    vehicles: [],
    hasNextPage: true,
    page: 0,
    key: ''
  };
  this.page = 0
}


componentDidMount() {
  this.initialize()
}


/**
 * This method initialize all components dependencies
 */
initialize() {
  this.loadListeners()
}

/**
 * This method send a broadcast message to open a delete dialog
 */
goDeleteVehicle(vehicle) {
  PubSub.publish('openDialogDelete', vehicle.node);
}


/**
 * This method get vehicles list
 * @param  number page Page number sended from infinite scroll
 */

getVehicles(page) {

  let variables = {
    "limit": 20,
    "page": this.page,
    "type": "veiculo",
    "query": this.state.key
  }
  console.log(this.page);

  client.query({query: gql `${MODEL.getVehicles()}`, variables: variables, fetchPolicy: 'network-only'}).then(res => {
    let responseVehicles = res['data']['buscaVeiculo']['edges']
    let currentlyVehicles = this.state.vehicles
    this.setState({hasNextPage: res['data']['buscaVeiculo']['pageInfo']['hasNextPage']
    })
    let vehicles = [
      ...currentlyVehicles,
      ...responseVehicles
    ]
    this.setState({vehicles: vehicles});

  }).catch(err => {
    console.log(err);
  })
  this.page = this.page + 1;
}

/**
 * [changeDetails description]
 * @param  {[type]} ctx      [description]
 * @param  {[type]} vehicles [description]
 */

changeDetails(ctx, vehicles) {
  console.log("vehicles onclick", vehicles);
  PubSub.publish('changeDetails', vehicles);
}


/**
 * This method load vehicle when a broadcast has been sended
 * for load remotely vehicles list
 */

loadListeners() {
  PubSub.subscribe('loadVehiclesList', function(topicName, obj) {
    this.setState({vehicles: []})
    this.page = 0;
    this.getVehicles(this.page)
  }.bind(this));
  PubSub.subscribe('findByKey', function(topicName, key) {
    this.setState({vehicles: [], key: key})
    this.page = 0;
    this.getVehicles(this.page)
  }.bind(this));
}


  render() {

    let vehicles = this.state.vehicles.map(vehicle => {
          return(
            <span id="divider">
              <ListItem
                style={{'backgroundColor': 'white ' }}
                onClick={(e) => this.changeDetails(e, vehicle.node)}
                button="true"
                rightIcon={         <IconButton
                          iconClassName="fas fa-trash-alt"
                          tooltip="Remover Veículo"
                          tooltipPosition="top-left"
                          onClick={this.goDeleteVehicle.bind(this, vehicle)}
                          iconStyle={{color:'#45535A' }}

                          />}
                >
                  <span className="card-text" style={{'fontWeight': "bold", "font-size": "12px"}}>{vehicle.node.marca}</span>
                  <span className="card-text" style={{'color': "#189C6C", "font-size": "12px"}}>{vehicle.node.modelo}</span>
                  <span className="card-text" style={{'color': "#45535A", "font-size": "12px"}}>{vehicle.node.ano_modelo}</span>

              </ListItem>
                <Divider style={{'borderBottom': '10px solid #e2e4e1' }}  />
            </span>





          )
        })




		return (
      <div style={{'overflow': 'auto', height: '500px' ,'backgroundColor': '#e2e4e1'}}>
      <InfiniteScroll
         pageStart={0}
         loadMore={this.getVehicles.bind(this)}
         hasMore={this.state.hasNextPage}
         useWindow={false}
      >
    <Card style={{'backgroundColor': '#e2e4e1' }} >
    <CardText>
      <List component="nav" >
        {vehicles}

       </List>
      </CardText>
    </Card>


</InfiniteScroll></div>
		);
	}


}
