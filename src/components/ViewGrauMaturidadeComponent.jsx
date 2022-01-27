import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {verificaRota} from "../auth";

class ViewGrauMaturidadeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,

        }
    }

    componentDidMount() {
        CienciaAbertaService.buscaGrauMaturidade(this.state.id).then((res) => {
            let grauMaturidade = res.data;
            this.setState({
                nivelGrauMaturidade: grauMaturidade.nivelGrauMaturidade,
                descricaoGrauMaturidade: grauMaturidade.descricaoGrauMaturidade,
                pontuacaoMinimaGrauMaturidade: grauMaturidade.pontuacaoMinimaGrauMaturidade,
                pontuacaoMaximaGrauMaturidade: grauMaturidade.pontuacaoMaximaGrauMaturidade,
                porcentagemGrauMaturidade: grauMaturidade.porcentagemGrauMaturidade
            });

        });

    }

    cancel() {
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Grau Aderência</h3>
                            <div className = "card-body">

                                        <div className = "form-group">
                                            <label htmlFor="nivelGrauMaturidade"> <b>Nível: </b></label><br></br>
                                           <label> {this.state.nivelGrauMaturidade}</label>
                                            <br></br><br></br>
                                        </div>

                                        <div className = "form-group">
                                            <label htmlFor="descricaoGrauMaturidade"> <b>Descrição:</b> </label><br></br>
                                            <label> {this.state.descricaoGrauMaturidade}</label>
                                            <br></br><br></br>
                                        </div>
                                        </div>

                                        <div className = "form-group" >
                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="pontuacaoMinimaGrauMaturidade"><b> Pontuação Mínima (%): </b></label><br></br>
                                                    <label> {this.state.pontuacaoMinimaGrauMaturidade}</label>
                                                    <br></br><br></br>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="pontuacaoMaximaGrauMaturidade"><b> Pontuação Máxima (%): </b></label><br></br>
                                                    <label> {this.state.pontuacaoMaximaGrauMaturidade}</label>
                                                    <br></br><br></br>
                                                </div>
                                            </div>
                                            <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <label htmlFor="porcentagemGrauMaturidade"><b> Porcentagem (%): </b></label><br></br>
                                            <label> {this.state.porcentagemGrauMaturidade}</label>
                                            <br></br><br></br>
                                        </div>

                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Voltar</button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewGrauMaturidadeComponent;