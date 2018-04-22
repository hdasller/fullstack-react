import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import SelectType from './SelectType.js'
import PubSub from 'pubsub-js';
import MODEL from './models/gql.model.js'
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import BASE_URL from './config/constants.js';
const client = new ApolloClient(BASE_URL);

export default class MutationModal extends React.Component {


    constructor() {

      super();
      this.state = {
          open: false,
          teste: false,
          isUpdate: false,
          title: '',
          obj: {}
        };
    }

    componentDidMount(){

      PubSub.subscribe('openDialogUpdate', function(topicName,obj){
        this.handleOpen()
        this.setState({
          'isUpdate': true,
         '_id': obj._id,
         'obj': this.makeVehicle(obj),
         'title': "Alterar Veículo",
         'titleButtom': "Alterar"
       })
      }.bind(this));
      PubSub.subscribe('openDialogCreate', function(topicName,vehicle){
        this.handleOpen()
        this.setState({
         'title': "Novo Veículo",
         'titleButtom': "Adicionar"
       })
      }.bind(this));

  }
  makeVehicle(obj){
    return  {
          ano_fabricacao: obj.ano_fabricacao,
          ano_modelo: obj.ano_modelo,
          combustivel: obj.combustivel,
          cor: obj.cor,
          marca: obj.marca,
          modelo: obj.modelo,
          usado: obj.usado
        }
  }

submitForm() {

  this.setState({
    obj: {
      ano_fabricacao: 2018
    }
  })

  let model = MODEL.createVehicle()
  let variables = {
    "data": this.state.obj
  }

  if (this.state.isUpdate) {
    model = MODEL.updateVehicle()
    variables.id = this.state._id
  }

  client.mutate({mutation: gql `${model}`, variables: variables}).then(res => {
    console.log("resposta create ", res);
  })
}

handleOpen = () => {
  this.setState({open: true});
};

handleClose = () => {
  this.setState({open: false});
};

salvaAlteracao(nomeInput, evento) {
  var campoSendoAlterado = {};
  campoSendoAlterado[nomeInput] = evento.target.value;
  this.setState({obj:campoSendoAlterado});
  console.log(this.state);
}


  render() {
    const styles = {
      underlineStyle: {
        borderColor: "#45535A",
      }
    };
    const actions = [

      <RaisedButton
       icon={<i className="fas fa-pencil-alt"></i>}
       labelColor="#FFF"
       label={this.state.titleButtom}
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
          title={this.state.title}
          actions={actions}
          modal={true}
          open={this.state.open}
          bodyClassName="modal-mutation body"
          titleClassName="modal-mutation title"
          actionsContainerClassName="modal-mutation actions"
        >

        <form onSubmit={this.submitForm.bind(this)} method="post">
          <TextField
            id="modelo"
            underlineStyle={styles.underlineStyle}
            value={this.state.obj['modelo']}
          onChange={this.salvaAlteracao.bind(this,'modelo')}
          floatingLabelText="Veículo"
          /><br />
          <SelectType id="marca" type="MarcaType" name="Marca"
          underlineStyle={styles.underlineStyle}
          ></SelectType><br />
          <TextField
          id="ano_modelo"
          type="number"
          value={this.state.obj['ano_modelo']}
          onChange={this.salvaAlteracao.bind(this,'ano_modelo')}
          floatingLabelText="Ano Modelo"
          /><br />
          <TextField
            id="ano_fabricacao"
            underlineStyle={styles.underlineStyle}

          value={this.state.obj['ano_fabricacao']}
          onChange={this.salvaAlteracao.bind(this,'ano_fabricacao')}
          floatingLabelText="Ano Fabricação"
          /><br />
          <SelectType id="combustivel" type="CombustivelType" name="Combustivel"
          onChange={this.salvaAlteracao.bind(this,'combustivel')}
          underlineStyle={styles.underlineStyle}

          ></SelectType><br />
          <TextField
          underlineStyle={styles.underlineStyle}

          id="cor"
          value={this.state.obj['cor']}
          onChange={this.salvaAlteracao.bind(this,'cor')}
          floatingLabelText="Cor"
          /><br />
        <Toggle id="usado" label="Usado" onChange={this.salvaAlteracao.bind(this, 'usado')}/><br />
        </form>
        </Dialog>
      </div>
    );
  }
}
