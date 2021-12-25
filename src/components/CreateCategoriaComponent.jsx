import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form"; 

class CreateCategoriaComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleDescricaoCategoriaChange = (event) => {
        this.setState ({descricaoCategoria: event.target.value});
    }

    handlePontosPossiveisCategoriaPerguntaChange = (event) => {
        this.setState ({pontosPossiveisCategoriaPergunta: event.target.value});
    }
    saveCategoria = (e) => {
        e.preventDefault();
        let categoria = {
             descricaoCategoriaPergunta: this.state.descricaoCategoria,
            pontosPossiveisCategoriaPergunta:this.state.pontosPossiveisCategoriaPergunta};
        console.log('categoria => ' + JSON.stringify(categoria));

            CienciaAbertaService.createCategoria(categoria).then(res =>{
            this.props.history.push('/categoria_list');
        });
    }
    cancel(){
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Adicionar Categoria</h3>

                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nome Categoria: </label>
                                            <input placeholder="Nome Categoria" id="descricaoCategoria" name="descricaoCategoria" className="form-control"
                                                   value = {this.state.descricaoCategoria} onChange = {this.handleDescricaoCategoriaChange}  />
                                        <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <label> Pontos Possíveis Categoria (%): </label>
                                            <input placeholder="Pontos Possíveis" id="pontosPossiveisCategoriaPergunta" name="pontosPossiveisCategoriaPergunta" className="form-control"
                                                   value = {this.state.pontosPossiveisCategoriaPergunta} onChange = {this.handlePontosPossiveisCategoriaPerguntaChange}  />
                                            <br></br>
                                        </div>


                                        <button className="btn btn-success" onClick={this.saveCategoria}>Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateCategoriaComponent