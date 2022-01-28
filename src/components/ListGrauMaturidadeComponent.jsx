import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import axios from "axios";
import {verificaRota} from "../auth";

class ListGrauMaturidadeComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            grausMaturidade: []
        }
        this.addGrauMaturidade = this.addGrauMaturidade.bind(this);
        this.deleteGrauMaturidade = this.deleteGrauMaturidade.bind(this);

    }


    deleteGrauMaturidade(id){
        console.log(id);

        CienciaAbertaService.deleteGrauMaturidade(id).then( res => {
            this.setState({grausMaturidade: this.state.grausMaturidade.filter(grauMaturidade => grauMaturidade.id !== id)});
        });
    }

    editGrauMaturidade(id){
        this.props.history.push('/grau_maturidade_edit/'+id);
    }

    componentDidMount(){
        verificaRota();
        CienciaAbertaService.listGrauMaturidade().then((res) => {
            this.setState({ grausMaturidade: res.data});
        });
    }
    addGrauMaturidade(){
        this.props.history.push('/grau_maturidade');
    }


    render() {
        return (
            <div>
                <br></br>
                <h2 className="text-center">Listagem Grau Aderência</h2>
                <div className = "col-md-12">
                    <button className="btn btn-primary" onClick={this.addGrauMaturidade}> Adicionar Grau Aderência</button>
                </div>
                <br></br>
                <div className = "row">
                    <div className = "col-md-12 offset-md-0 offset-md-0">
                        <table className = "table table-striped table-bordered">

                            <thead>
                            <tr>
                                <th> Nível </th>
                                <th> Descrição </th>
                                <th> Pontuação </th>
                                <th> Porcentagem </th>
                                <th style={{alignItems: "center"}}> Ações </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.grausMaturidade.map(
                                    grauMaturidade =>
                                        <tr key = {grauMaturidade.id}>
                                            <td width='15%'> { grauMaturidade.nivelGrauMaturidade} </td>
                                            <td width='50%'> { grauMaturidade.descricaoGrauMaturidade}</td>
                                            <td width='15%'> { grauMaturidade.pontuacaoMinimaGrauMaturidade}% - {grauMaturidade.pontuacaoMaximaGrauMaturidade}%</td>
                                            <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.editGrauMaturidade(grauMaturidade.id)} className="btn btn-info">Atualizar </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteGrauMaturidade(grauMaturidade.id)} className="btn btn-danger">Apagar </button>
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

export default ListGrauMaturidadeComponent