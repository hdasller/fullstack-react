import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import PubSub from 'pubsub-js';
import MODEL from './models/gql.model.js'
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import RaisedButton from 'material-ui/RaisedButton';

const customContentStyle = {
  width: '20%',
  maxWidth: 'none',
};


export default class DeleteModal extends React.Component {
  constructor() {

    super();
    this.state = {
      open: false,
      vehicleId:'',
      vehicleName: ''
      };
  }

  componentDidMount(){
    this.initialize()
  }

  initialize(){
    this.loadListeners()
  }

  submitForm() {


    let model = MODEL.deleteVehicle()
    let variables = {
      "_id": this.state.vehicleId
    }

  console.log(variables);

    // client.mutate({mutation: gql `${model}`, variables: variables}).then(res => {
    //   console.log("resposta delete ", res);
    // })
  }

  loadListeners(){
    PubSub.subscribe('openDialogDelete', function(topicName,vehicle){
      this.handleOpen()
      this.setState({
        vehicleId: vehicle._id,
        vehicleName: vehicle.modelo
     })
    }.bind(this));
  }


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {
    const actions = [

      <RaisedButton
       icon={<i className="fas fa-pencil-alt"></i>}
       labelColor="#FFF"
       label="Deletar"
       backgroundColor="#45535A"
       onClick={this.submitForm.bind(this)}
       style={{'marginRight': "15px"}}
       />,

       <RaisedButton
        labelColor="#FFF"
        label="Cancelar"
        backgroundColor="#2a3138"
        onClick={this.handleClose}
        />
    ];

    return (
      <div>
        <Dialog
          title={"Deseja mesmo remover " +this.state.vehicleName + "?"}
          actions={actions}
          modal={true}
          contentStyle={customContentStyle}
          open={this.state.open}
        >
          Cuidado, esta ação é permanente.
        </Dialog>
      </div>
    );
  }
}
