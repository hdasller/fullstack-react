import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import PubSub from 'pubsub-js';
import MODEL from './models/gql.model.js'
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import BASE_URL from './config/constants.js';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const client = new ApolloClient(BASE_URL);


export default class MutationModal extends React.Component {


    constructor() {

      super();
      this.state = {
            open: false,
            isUpdate: false,
            title: '',
            obj: {},
            markTypes: [],
            fuelTypes: [],
            marca: 'FIAT',
            modelo: '',
            ano_modelo: '',
            ano_fabricacao: '',
            cor:'',
            usado: false,
            combustivel: 'FLEX'
          }

    }

    componentDidMount(){
      this.initialize()
    }

    /**
     * This method initialize all components dependencies
     */

    initialize(){
      this.loadListeners()
      this.loadMarkTypes()
      this.loadFuelTypes()
    }

    /**
     * This method load mark types for generate a list to select options
     *
     */

    loadMarkTypes(){
      this.getTypes('markTypes', 'MarcaType')
    }

    /**
     * This method load fuel types for generate a list to select options
     *
     */
    loadFuelTypes(){
      this.getTypes('fuelTypes', 'CombustivelType')
    }

    /**
     * This mehod load types from graphql api.
     * @param  {[type]} localType Name of array
     * @param  {[type]} queryType Name of query type
     */

    getTypes(localType, queryType) {
      let variables = {}
      client
        .query({
          query:  gql`${MODEL.getTypes(queryType)}`,
          variables: variables,   fetchPolicy: 'network-only'
      }).then(res=> {
        this.setState({[`${localType}`]: res["data"]["__type"]['enumValues']})
        }).catch(err => {
          console.log(err);
        })
    }

    /**
     * This method listen a broadcast to await message to prepare dialog for update or create form.
     */

  loadListeners(){
    PubSub.subscribe('openDialogUpdate', function(topicName,obj){
      this.handleOpen()
      this.setState({
        'isUpdate': true,
       '_id': obj._id,
       'title': "Alterar Veículo",
       'titleButtom': "Alterar",
       ...this.makeVehicle(obj),
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


  /**
   * This method load list of vehicles
   */
  loadVehiclesList(){
    PubSub.publish('loadVehiclesList');
  }


  /**
   * This method prepare a object to this component state
   */
  makeVehicle(obj, isSend?){
    return  {
          ano_fabricacao: obj.ano_fabricacao,
          ano_modelo: obj.ano_modelo,
          combustivel: obj.combustivel ,
          cor: obj.cor,
          marca:  obj.marca ,
          modelo: obj.modelo,
          usado: obj.usado
        }
  }

  /**
   * This mehod send a requisition to create or update a vehicle
   */

submitForm() {


  let model = MODEL.createVehicle()
  let variables = {
    "data": this.makeVehicle(this.state)
  }

  if (this.state.isUpdate) {
    model = MODEL.updateVehicle()
    variables.id = this.state._id
  }

  console.log(variables);
  client.mutate({mutation: gql `${model}`, variables: variables}).then(res => {
  this.loadVehiclesList()
  this.handleClose()
  }).catch(err => {
    console.log(err);
    this.handleClose()

  })
}

/**
 * This mehod change state to open dialog.
 */
handleOpen = () => {
  this.setState({open: true});
};

/**
 * This mehod change state to close dialog.
 */
handleClose = () => {

this.setState({
    open: false,
    isUpdate: false,
    title: '',
    obj: {},
    marca: 'FIAT',
    modelo: '',
    ano_modelo: '',
    ano_fabricacao: '',
    cor:'',
    usado: false,
    combustivel: 'FLEX'})

};
/**
 * This method set a state to itens of form.
 * @param {[type]} key   Name of state
 * @param {[type]} ctx   Context
 * @param {[type]} value Value of item form
 */
setSelectValue(key, ctx, value){
  let result;
  if(key == "marca" || key == "combustivel")
  result = ctx.target.outerText
  else result = value
  let selected = {
    [key]: result
  }
  this.setState(selected);
}

  render() {
    const styles = {
      underlineStyle: {
        borderColor: "#45535A",
      }
    };
    const actions = [

      <RaisedButton
       icon={<i className="fas fa-check"></i>}
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

    let markItens =  this.state.markTypes.map((mark, i) => {
     return (  <MenuItem value={mark.name}  id={"mk-item-"+i}  primaryText={mark.name} />)
   })
   let fuelItens =  this.state.fuelTypes.map((fuel, i) => {
    return (  <MenuItem value={fuel.name}  id={"fl-item-"+i}  primaryText={fuel.name} />)
  })

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
          <div className="row">
            <div className="col-sm-6">
              <TextField
                id="modelo"
                underlineStyle={styles.underlineStyle}
                value={this.state['modelo']|| ""}
                onChange={this.setSelectValue.bind(this,'modelo')}
                floatingLabelText="Veículo"
              /><br />
            </div>
            <div className="col-sm-6">

              <SelectField
                underlineStyle={styles.underlineStyle}
                value={this.state['marca'] || ""}
                onChange={this.setSelectValue.bind(this, 'marca')}
                floatingLabelText="Marca"
                id="mark-select">
            {markItens}

            </SelectField>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <TextField
              id="ano_modelo"
              type="number"
              underlineStyle={styles.underlineStyle}
              value={this.state['ano_modelo'] || ""}
              onChange={this.setSelectValue.bind(this,'ano_modelo')}
              floatingLabelText="Ano Modelo"
              /><br />
            </div>
            <div className="col-sm-6">
              <TextField
              id="ano_fabricacao1"
              type="number"
              underlineStyle={styles.underlineStyle}
              value={this.state['ano_fabricacao'] || ""}
              onChange={this.setSelectValue.bind(this,'ano_fabricacao')}
              floatingLabelText="Ano Fabricação"
              /><br />
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <SelectField
                  underlineStyle={styles.underlineStyle}
                  value={this.state['combustivel']|| ""}
                  onChange={this.setSelectValue.bind(this, 'combustivel')}
                  floatingLabelText="Combustível"
                  id="fuel-select">
            {fuelItens}
            </SelectField>
            </div>
            <div className="col-sm-6">
              <TextField
              underlineStyle={styles.underlineStyle}
              id="cor"
              value={this.state['cor']|| ""}
              onChange={this.setSelectValue.bind(this,'cor')}
              floatingLabelText="Cor"
              /><br />
            </div>
          </div>
          <div className="row">
            <div  className="col-sm-3">
              <Toggle
                id="usado"
                label="Usado"
                defaultToggled={this.state['usado']}
                labelStyle={{'fontWeight': '100',  'color': ''}}
                onToggle={this.setSelectValue.bind(this, 'usado')}
                   /><br />
            </div>
          </div>
        </form>
        </Dialog>
      </div>
    );
  }
}
