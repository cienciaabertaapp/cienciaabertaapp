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

    }

    componentDidMount(){
        CienciaAbertaService.listGlossario().then((res) => {
            this.setState({ glossarios: res.data});
        });
    }


    render() {
        return (

            <div>

                <br></br>
                <div className = "row">
                    <div className = "col-md-10 offset-md-1 offset-md-1">
                        <table className = "table">

                            <thead>
                            <tr>
                                <th> Glossário</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.glossarios.map(
                                    glossario =>
                                        <tr key = {glossario.id}>

                                            <td width='50%' style={{textAlign:'justify'}}> { glossario.descricaoGlossario} </td>
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