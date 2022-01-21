import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import axios from "axios";
import ListUserComponent from "./ListUserComponent";
import UpdateCategoriaComponent from "./UpdateCategoriaComponent";
import CreateUsuarioComponent from "./CreateUsuarioComponent";
import {verificaRota} from "../auth";

class ListCategoriaComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            categorias: []
        }
        this.addCategoria = this.addCategoria.bind(this);
        this.deleteCategoria = this.deleteCategoria.bind(this);

    }


    deleteCategoria(id){
        console.log(id);
        console.log(this.state.categorias);

       CienciaAbertaService.deleteCategoria(id).then( res => {
            this.setState({categorias: this.state.categorias.filter(categoria => categoria.id !== id)});
      });
    }

    editCategoria(id){
        this.props.history.push('/categoria_edit/'+id);
    }


    componentDidMount(){
        verificaRota();
        CienciaAbertaService.listCategoria().then((res) => {
            this.setState({ categorias: res.data});
        });
    }
    addCategoria(){
        this.props.history.push('/categoria');
    }


    render() {
        return (

            <div>

                <br></br>
                <h2 className="text-center">Listagem Categorias</h2>
                <div className = "col-md-12">
                    <button className="btn btn-primary" onClick={this.addCategoria}> Adicionar Categoria</button>
                </div>
                <br></br>
                <div className = "row">
                    <div className = "col-md-12 offset-md-0 offset-md-0">
                        <table className = "table table-striped table-bordered">

                            <thead>
                            <tr>
                                <th> Descrição Categoria</th>
                                <th> Pontos Possíveis </th>
                                <th style={{alignItems: "center"}}> Ações </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.categorias.map(
                                    categoria =>
                                        <tr key = {categoria.id}>

                                            <td width='50%'> { categoria.descricaoCategoriaPergunta} </td>
                                            <td width='33%'> { categoria.pontosPossiveisCategoriaPergunta} %</td>
                                            <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.editCategoria(categoria.id)} className="btn btn-info">Atualizar </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.deleteCategoria(categoria.id)} className="btn btn-danger">Apagar </button>
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

export default ListCategoriaComponent