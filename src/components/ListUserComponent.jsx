import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import axios from "axios";

class ListUserComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            usuarios: []
        }
        this.addUsuario = this.addUsuario.bind(this);
        this.editUsuario = this.editUsuario.bind(this);
        this.deleteUsuario = this.deleteUsuario.bind(this);

    }


    deleteUsuario(id){
        CienciaAbertaService.deleteUsuario(id).then( res => {
            this.setState({usuarios: this.state.usuarios.filter(usuario => usuario.id !== id)});
        });
    }
    viewUsuario(id){
        this.props.history.push('/usuario_view/'+id);
    }

    editUsuario(id){
        //console.log(id);
        this.props.history.push('/usuario_edit/'+id);
    }


    componentDidMount(){
        CienciaAbertaService.listUsuarios().then((res) => {
            this.setState({ usuarios: res.data});
        });
    }
    addUsuario(){
        this.props.history.push('/usuario');
    }


    render() {
        return (
            <div>
                <br></br>
                <h2 className="text-center">Listagem Usuários</h2>
                <div className = "col-md-12">
                    <button className="btn btn-primary" onClick={this.addUsuario}> Adicionar Usuário</button>
                </div>
                <br></br>
                <div className = "row">
                    <div className = "col-md-12 offset-md-0 offset-md-0">
                        <table className = "table table-striped table-bordered">

                            <thead>
                            <tr>
                                <th> Nome</th>
                                <th> Instituição</th>
                                <th style={{alignItems: "center"}}> Ações </th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.usuarios.map(
                                    usuario =>
                                        <tr key = {usuario.id}>
                                            <td width='45%'> { usuario.nomeUsuario} </td>
                                            <td width='31%'> { usuario.instituicaoUsuario} </td>
                                            <td>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.viewUsuario(usuario.id)} className="btn btn-secondary">Visualizar </button>
                                                <button style={{marginLeft: "10px"}} onClick={ () => this.editUsuario(usuario.id)} className="btn btn-info">Atualizar </button>

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