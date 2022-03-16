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
    }

    componentDidMount(){
        CienciaAbertaService.listReferencias().then((res) => {
            this.setState({ referencia: res.data});
        });
    }


    render() {
        return (

            <div>

                <br></br>
                <div className = "row">
                    <div className = "col-md-10 offset-md-1 offset-md-1">
                        <table className = "table ">

                            <thead>
                            <tr>
                                <th> Referências</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.referencia.map(
                                    referencias =>
                                        <tr key = {referencias.id}>

                                            <td width='50%' style={{textAlign:'justify'}}> { referencias.descricaoReferencias} </td>
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