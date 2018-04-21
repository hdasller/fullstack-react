import React, { Component } from 'react';

export default class Details extends Component {

  constructor() {

    super();
    // this.state = {modelo: '', marca: '', ano_modelo: '', ano_fabricacao: '', combustivel: '', cor: '', usado: ''};
    this.state = {obj: {}}
  }

  render() {
		return (
        <div  className="card-body">
          <div className="title row">
            <p className="card-text">{this.state.obj.modelo}</p>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <p className="card-text">Marca</p>
              <p className="card-text">{this.state.obj.marca}</p>
            </div>
            <div className="col-sm-6">
              <p className="card-text">Ano Modelo</p>
              <p className="card-text">{this.state.obj.ano_modelo}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <p className="card-text">Ano Fabricação</p>
              <p className="card-text">{this.state.obj.ano_fabricacao}</p>
            </div>
            <div className="col-sm-6">
              <p className="card-text">Combustível</p>
              <p className="card-text">{this.state.obj.combustivel}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <p className="card-text">Cor</p>
              <p className="card-text">{this.state.obj.cor}</p>
            </div>
            <div className="col-sm-6">
              <p className="card-text">Usado</p>
              <p className="card-text">{this.state.obj.usado}</p>
            </div>
          </div>
          <div>
            <button type="button" name="button">Alterar</button>
          </div>
        </div>

		);
	}


}
