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

    }


    componentDidMount(){
        CienciaAbertaService.listApresentacao().then((res) => {
            this.setState({ apresentacoes: res.data});
        });
    }


    render() {
        return (

            <div>

                <br></br>
                <br></br>
                <div className = "row">
                    <div className = "col-md-10 offset-md-1 offset-md-1">
                        <h2>APRESENTAÇÃO</h2>
                        <br></br>
                        <table className = "table">

                            <thead>
                            <tr>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.apresentacoes.map(
                                    apresentacao =>
                                        <tr key = {apresentacao.id}>

                                            <td width='50%'> { apresentacao.descricaoApresentacao} </td>
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