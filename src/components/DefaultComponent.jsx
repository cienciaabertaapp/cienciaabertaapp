import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";

class AnswerSearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            respostas:[]
        }
    }
    componentDidMount(){
        CienciaAbertaService.listRespostas().then((res) => {
            this.setState({ respostas: res.data});
            console.log(res.data);
        });
    }
    cancel(){
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <div className = "row">
                    <div className = "col-md-10 offset-md-1 offset-md-0">
                        <br></br>
                        <h2 className="text-center">FEED</h2>
                        <table className = "table table-striped table-bordered">
                            <thead>
                            <tr>
                                <th> Instituição</th>
                                <th> Grau de Maturidade </th>
                                <th style={{alignItems: "center"}}> Pontos Instituição </th>
                            </tr>
                            </thead>
                            <tbody>
                            { this.state.respostas.map(resp => (
                                resp.divulgaUsuario ?
                                    <>
                                        <tr key={resp.id}>
                                            <td width='50%'>   {resp.instituicaoUsuario} </td>
                                            <td width='30%'>  {resp.grauMaturidadeUsuario.nivelGrauMaturidade}</td>
                                            <td width='20%'>  {resp.pontuacaoUsuario}</td>
                                        </tr>
                                    </>
                                    : null
                            ))
                            }
                            </tbody>
                        </table>
                    </div>

                </div>


            </div>



        )
    }
}

export default AnswerSearchComponent