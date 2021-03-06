import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {Card, CardText, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

export default class Details extends Component {

constructor() {

  super();

  this.state = {
    obj: {}
  }
  this.loadListeners()

}

/**
 * This method load vehicle when a broadcast has been sended
 */

loadListeners() {
  PubSub.subscribe('changeDetails', function(topicName, vehicle) {
    this.setState({obj: vehicle});
  }.bind(this));
}

/**
 * This method send a broadcast message to open a update dialog
 */

goUpdateVehicle() {
  PubSub.publish('openDialogUpdate', this.state.obj);
}

/**
 * This method send a broadcast message to open a delete dialog
 */

goDeleteVehicle() {
  PubSub.publish('openDialogDelete', this.state.obj);
}

  render() {
    let el = null;
    if (Object.keys( this.state.obj).length) {
      el = (
        <Card>
          //Verify if exists object
            // Object.keys(this.state.obj).lenght ?<div className="card-details-wapper">
            <CardHeader
              title={this.state.obj.modelo}
              titleColor="#189C6C"
              titleStyle={{'fontWeight': 'bold', 'marginTop':"1vh" }}
              />
            <div className="title row">
              <p className="card-text"></p>
            </div>
          <CardText>
            <div  className="card-body">

              <div className="row">
                <div className="col-sm-6">
                  <p className="card-text"><b>Marca</b></p>
                  <p className="card-text">{this.state.obj.marca}</p>
                </div>
                <div className="col-sm-6">
                  <p className="card-text"><b>Ano Modelo</b></p>
                  <p className="card-text">{this.state.obj.ano_modelo}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <p className=""><b>Ano Fabricação</b></p>
                  <p className="card-text">{this.state.obj.ano_fabricacao}</p>
                </div>
                <div className="col-sm-6">
                  <p className="card-text"><b>Combustível</b></p>
                  <p className="card-text">{this.state.obj.combustivel}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-6">
                  <p className="card-text"><b>Cor</b></p>
                  <p className="card-text">{this.state.obj.cor}</p>
                </div>
                <div className="col-sm-6">
                  <p className="card-text"><b>Usado</b></p>
                  <p className="card-text">{this.state.obj.usado ? "Sim": "Não"}</p>
                </div>
              </div>
              <div>
              </div>
            </div>
          </CardText>
              <CardActions className="footer-card">
                  <RaisedButton icon={<i className="fas fa-pencil-alt"></i>} labelColor="#FFF" label="EDITAR" backgroundColor="#45535A" onClick={this.goUpdateVehicle.bind(this)} />

                    <RaisedButton icon={<i className="fas fa-trash-alt"></i>} labelColor="#FFF" label="DELETAR" backgroundColor="#2a3138"  onClick={this.goDeleteVehicle.bind(this)} />
              </CardActions>
          </div>
        </Card>

      );
      return el;

    }

    el = (
      <Card>
        <div className="card-details-wapper">
          <CardHeader
            title={this.state.obj.modelo}
            titleColor="#189C6C"
            titleStyle={{'fontWeight': 'bold', 'marginTop':"1vh" }}
            />
          <div className="title row">
            <p className="card-text"></p>
          </div>
        <CardText>
          <div  className="card-body">

            <div className="row icon">
              <span><i class="fas fa-exclamation-triangle"></i></span>
            </div>
            <div className="row warnning">
              <span>Nenhum veículo selecionado ainda.</span>
            </div>

          </div>
        </CardText>
        </div>
      </Card>
    );

    return el;


	}


}
