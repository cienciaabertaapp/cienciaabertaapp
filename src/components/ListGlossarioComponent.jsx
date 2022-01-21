import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import axios from "axios";
import ListUserComponent from "./ListUserComponent";
import UpdateGlossarioComponent from "./UpdateGlossarioComponent";
import CreateUsuarioComponent from "./CreateUsuarioComponent";
import {verificaRota} from "../auth";

class ListGlossarioComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            glossarios: []
        }
        this.addGlossario = this.addGlossario.bind(this);
        this.deleteGlossario = this.deleteGlossario.bind(this);

    }


    deleteGlossario(id){
        console.log(id);
        console.log(this.state.glossarios);

       CienciaAbertaService.deleteGlossario(id).then( res => {
            this.setState({glossarios: this.state.glossarios.filter(glossario => glossario.id !== id)});
      });
    }

    editGlossario(id){
        this.props.history.push('/glossario_edit/'+id);
    }


    componentDidMount(){
        verificaRota();
        CienciaAbertaService.listGlossario().then((res) => {
            this.setState({ glossarios: res.data});
        });
    }
    addGlossario(){
        this.props.history.push('/glossario');
    }


    render() {
        return (

            <div>

                <br></br>
                <h2 className="text-center">Listagem Glossário</h2>
                <div className = "col-md-12">
                    <button className="btn btn-primary" onClick={this.addGlossario}> Adicionar Glossário</button>
                </div>
                <br></br>
                <div className = "row">
                    <div className = "col-md-12 offset-md-0 offset-md-0">
                        <table className = "table table-striped table-bordered">

                            <thead>
                            <tr>
                                <th> Descrição Glossário</th>
                                <th style={{alignItems: "center"}}> Ações </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.glossarios.map(
                                    glossario =>
                                        <tr key = {glossario.id}>

                                            <td width='50%'> { glossario.descricaoGlossario} </td>
                                            <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.editGlossario(glossario.id)} className="btn btn-info">Atualizar </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteGlossario(glossario.id)} className="btn btn-danger">Apagar </button>
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

export default ListGlossarioComponent