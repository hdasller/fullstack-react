import React, { Component } from 'react';
import PubSub from 'pubsub-js';
import {Card, CardText, CardActions, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';

export default class Details extends Component {

  constructor() {

    super();
    // this.state = {modelo: '', marca: '', ano_modelo: '', ano_fabricacao: '', combustivel: '', cor: '', usado: ''};
    this.state = {obj: {}}

    PubSub.subscribe('changeDetails', function(topicName,vehicle){
      this.setState({obj:vehicle});
    }.bind(this));
  }

goUpdateVehicle(){
  PubSub.publish('openDialogUpdate', this.state.obj);
}

  render() {
		return (


      <Card>
        //Verify if exists object
          // Object.keys(this.state.obj).lenght ?<div className="card-details-wapper">
          <CardHeader
            title={this.state.obj.modelo}
            titleColor="#189C6C"
            titleStyle={{'font-weight': 'bold', 'margin-top':"1vh" }}
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
                <RaisedButton icon={<i class="fas fa-pencil-alt"></i>} labelColor="#FFF" label="EDITAR" backgroundColor="#45535A" onClick={this.goUpdateVehicle.bind(this)} />

                  <RaisedButton icon={<i class="fas fa-trash-alt"></i>} labelColor="#FFF" label="DELETAR" backgroundColor="#2a3138"  />
            </CardActions>
        </div>
      </Card>



		);
	}


}
