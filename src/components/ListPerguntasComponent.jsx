import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import axios from "axios";

class ListUserComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            perguntas: []
        }
        this.addPergunta = this.addPergunta.bind(this);
        this.editPergunta = this.editPergunta.bind(this);
        //this.deleteUsuario = this.deleteUsuario.bind(this);

    }

    viewPergunta(id){
        this.props.history.push('/pergunta_view/'+id);
    }

    editPergunta(id){
        //console.log(id);
        this.props.history.push('/pergunta_edit/'+id);
    }


    componentDidMount(){
        CienciaAbertaService.listPerguntas().then((res) => {
            this.setState({ perguntas: res.data});
        });
    }
    addPergunta(){
        this.props.history.push('/perguntas');
    }


    render() {
        return (
            <div>
                <br></br>
                <h2 className="text-center">Listagem Perguntas</h2>
                <div className = "col-md-12">
                    <button className="btn btn-primary" onClick={this.addPergunta}> Adicionar Pergunta</button>
                </div>
                <br></br>
                <div className = "row">
                    <div className = "col-md-12 offset-md-0 offset-md-0">
                        <table className = "table table-striped table-bordered">

                            <thead>
                            <tr>
                                <th> Descrição</th>
                                <th> Categoria</th>
                                <th> Tipo Pergunta</th>
                                <th style={{alignItems: "center"}}> Ações </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.perguntas.map(
                                    pergunta =>
                                        <tr key = {pergunta.id}>
                                            <td > { pergunta.descricaoPergunta} </td>
                                            <td > { pergunta.categoria.descricaoCategoriaPergunta} </td>
                                            <td width='20%'> { pergunta.perguntaTipoPergunta} </td>
                                            <td width='18%'>
                                                <button style={{marginLeft: "5x"}} onClick={ () => this.viewPergunta(pergunta.id)} className="btn btn-secondary">Visualizar </button>
                                                <button style={{marginLeft: "5px"}} onClick={ () => this.editPergunta(pergunta.id)} className="btn btn-info">Atualizar </button>

                                            </td>
                                        </tr>
                                )
                            }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        )
    }
}

export default ListUserComponent