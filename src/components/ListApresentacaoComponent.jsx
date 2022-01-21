import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import axios from "axios";
import ListUserComponent from "./ListUserComponent";
import UpdateApresentacaoComponent from "./UpdateApresentacaoComponent";
import CreateUsuarioComponent from "./CreateUsuarioComponent";
import {verificaRota} from "../auth";

class ListApresentacaoComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            apresentacoes: []
        }
        this.addApresentacao = this.addApresentacao.bind(this);
        this.deleteApresentacao = this.deleteApresentacao.bind(this);

    }


    deleteApresentacao(id){
        console.log(id);
        console.log(this.state.apresentacoes);

       CienciaAbertaService.deleteApresentacao(id).then( res => {
            this.setState({apresentacoes: this.state.apresentacoes.filter(apresentacao => apresentacao.id !== id)});
      });
    }

    editApresentacao(id){
        this.props.history.push('/apresentacao_edit/'+id);
    }


    componentDidMount(){
        verificaRota();
        CienciaAbertaService.listApresentacao().then((res) => {
            this.setState({ apresentacoes: res.data});
        });
    }
    addApresentacao(){
        this.props.history.push('/apresentacao');
    }


    render() {
        return (

            <div>

                <br></br>
                <h2 className="text-center">Listagem Apresentação</h2>
                <div className = "col-md-12">
                    <button className="btn btn-primary" onClick={this.addApresentacao}> Adicionar Apresentação</button>
                </div>
                <br></br>
                <div className = "row">
                    <div className = "col-md-12 offset-md-0 offset-md-0">
                        <table className = "table table-striped table-bordered">

                            <thead>
                            <tr>
                                <th> Descrição Apresentação</th>
                                <th style={{alignItems: "center"}}> Ações </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.apresentacoes.map(
                                    apresentacao =>
                                        <tr key = {apresentacao.id}>

                                            <td width='50%'> { apresentacao.descricaoApresentacao} </td>
                                            <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.editApresentacao(apresentacao.id)} className="btn btn-info">Atualizar </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteApresentacao(apresentacao.id)} className="btn btn-danger">Apagar </button>
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

export default ListApresentacaoComponent