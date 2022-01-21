import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import axios from "axios";
import ListUserComponent from "./ListUserComponent";
import UpdateReferenciasComponent from "./UpdateReferenciasComponent";
import CreateUsuarioComponent from "./CreateUsuarioComponent";
import {verificaRota} from "../auth";

class ListReferenciasComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            referencia: []
        }
        this.addReferencias = this.addReferencias.bind(this);
        this.deleteReferencias = this.deleteReferencias.bind(this);

    }


    deleteReferencias(id){
        console.log(id);
        console.log(this.state.referencia);

       CienciaAbertaService.deleteReferencias(id).then( res => {
            this.setState({referencia: this.state.referencia.filter(referencias => referencias.id !== id)});
      });
    }

    editReferencias(id){
        this.props.history.push('/referencias_edit/'+id);
    }


    componentDidMount(){
        verificaRota();
        CienciaAbertaService.listReferencias().then((res) => {
            this.setState({ referencia: res.data});
        });
    }
    addReferencias(){
        this.props.history.push('/referencias');
    }


    render() {
        return (

            <div>

                <br></br>
                <h2 className="text-center">Listagem Referências</h2>
                <div className = "col-md-12">
                    <button className="btn btn-primary" onClick={this.addReferencias}> Adicionar Referências</button>
                </div>
                <br></br>
                <div className = "row">
                    <div className = "col-md-12 offset-md-0 offset-md-0">
                        <table className = "table table-striped table-bordered">

                            <thead>
                            <tr>
                                <th> Descrição Referências</th>
                                <th style={{alignItems: "center"}}> Ações </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.referencia.map(
                                    referencias =>
                                        <tr key = {referencias.id}>

                                            <td width='50%'> { referencias.descricaoReferencias} </td>
                                            <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.editReferencias(referencias.id)} className="btn btn-info">Atualizar </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteReferencias(referencias.id)} className="btn btn-danger">Apagar </button>
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

export default ListReferenciasComponent