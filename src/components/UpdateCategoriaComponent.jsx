import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";

class UpdateCategoriaComponent extends Component {

    constructor(props) {
        super(props)
            this.state = {
                id: this.props.match.params.id,
                descricaoCategoriaPergunta: '',
                pontosPossiveisCategoriaPergunta:''
            }
            this.handleNomeCategoriaChange = this.handleNomeCategoriaChange.bind(this);
            this.handlePontosPossiveisCategoriaPerguntaChange= this.handlePontosPossiveisCategoriaPerguntaChange.bind(this);

    }

    componentDidMount(){

        CienciaAbertaService.buscaCategoria(this.state.id).then( (res) =>{
            let categoria = res.data;
            this.setState({
                descricaoCategoriaPergunta: categoria.descricaoCategoriaPergunta,
                pontosPossiveisCategoriaPergunta: categoria.pontosPossiveisCategoriaPergunta
            });

           // console.log(categoria.descricaoCategoriaPergunta);
        });

    }



    handleNomeCategoriaChange = (event) => {
        this.setState ({descricaoCategoriaPergunta: event.target.value});
    }

    handlePontosPossiveisCategoriaPerguntaChange = (event) => {
        this.setState ({pontosPossiveisCategoriaPergunta: event.target.value});
    }

    saveCategoria = (e) => {
        e.preventDefault();
        let categoria = {
            descricaoCategoriaPergunta: this.state.descricaoCategoriaPergunta,
            pontosPossiveisCategoriaPergunta: this.state.pontosPossiveisCategoriaPergunta
        };
        console.log('categoriaPergunta => ' + JSON.stringify(categoria));

        CienciaAbertaService.updateCategoria(this.state.id,categoria).then(res =>{
            this.props.history.push('/categoria_list');
        });
    }


    cancel(){
        this.props.history.push('/categoria_list');
    }
    render() {
        return (
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Alterar Categoria</h3>

                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Descrição Categoria: </label>
                                            <input placeholder="Descrição Categoria" id="descricaoCategoriaPergunta" name="descricaoCategoriaPergunta" className="form-control"
                                                   value = {this.state.descricaoCategoriaPergunta} onChange = {this.handleNomeCategoriaChange}  />
                                        </div>

                                        <div className = "form-group">
                                            <label> Pontos Possíveis Categoria: </label>
                                            <input placeholder="Pontos Possíveis" id="pontosPossiveisCategoriaPergunta" name="pontosPossiveisCategoriaPergunta" className="form-control"
                                                   value = {this.state.pontosPossiveisCategoriaPergunta} onChange = {this.handlePontosPossiveisCategoriaPerguntaChange}  />
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveCategoria}>Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

        )
    }
}

export default UpdateCategoriaComponent;