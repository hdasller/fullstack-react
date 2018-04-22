import React from 'react';
import gql from "graphql-tag";
import MODEL from './models/gql.model.js'
import BASE_URL from './config/constants.js';
import ApolloClient from "apollo-boost";
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const client = new ApolloClient(BASE_URL);

export default class SelectType extends React.Component {

constructor () {
  super()
  this.state = {marcas: [], value: 0}
  this.resultado = []
}

setSelectValue(e, key, payload){
  this.setState({value: key});
}

componentDidMount(){
  this.getTypes()
}
  getTypes() {
    let variables = {}
    client
      .query({
        query:  gql`${MODEL.getTypes(this.props.type)}`,
      variables: variables
    }).then(res=> {
      this.setState({marcas: res["data"]["__type"]['enumValues']})
      })
  }

  render() {
    let menuItens =  this.state.marcas.map((marca, i) => {
     return (  <MenuItem value={i}  id={i}  primaryText={marca.name} />)
   })
    return (
      <SelectField
        value={this.state.value}
        onChange={this.setSelectValue.bind(this)}
        floatingLabelText={this.props.name}
        id={this.props.id}
>
  {menuItens}

  </SelectField>
    )
  }

}
