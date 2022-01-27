import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";
import {TextField} from "@mui/material";
import {verificaRota} from "../auth";

class CreateGrauMaturidadeComponent extends Component {

    componentDidMount() {
        verificaRota();
    }

    saveGrauMaturidade = (values) => {

        CienciaAbertaService.createGrauMaturidade(values).then(res =>{
            this.props.history.push('/grau_maturidade_list');
        });
    }
    cancel(){
        this.props.history.push('/');
    }
    render() {

        const validations = yup.object().shape({
            nivelGrauMaturidade: yup
                .string()
                .min(4,'Nome muito curto!!')
                .required('Nome categoria é obrigatório!'),
            descricaoGrauMaturidade: yup
                .string()
                .min(6,'Nome muito curto!!')
                .required('Nome categoria é obrigatório!'),
            pontuacaoMinimaGrauMaturidade: yup
                .number()
                .integer("Inteiro")
                .required('Campo obrigatório!'),
            pontuacaoMaximaGrauMaturidade: yup
                .number()
                .positive('Número deve ser positivo')
                .integer("Inteiro")
                .required('Campo obrigatório!'),
            porcentagemGrauMaturidade: yup
                .number()
                .positive('Número deve ser positivo')
                .required('Campo obrigatório!'),
        });

        const initialValues = {
            nivelGrauMaturidade: "",
            descricaoGrauMaturidade: "",
            pontuacaoMinimaGrauMaturidade:0,
            pontuacaoMaximaGrauMaturidade: 0,
            porcentagemGrauMaturidade: 0,
            error: "",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;

        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Criar Grau Aderência</h3>

                            <div className = "card-body">
                                <Formik initialValues={initialValues} onSubmit={this.saveGrauMaturidade} validationSchema={validations}>
                                    <Form className="form">
                                        <div className = "form-group">
                                            <label htmlFor="nivelGrauMaturidade"> Nível: </label>
                                            <Field
                                                placeholder="Nível"
                                                id="nivelGrauMaturidade"
                                                name="nivelGrauMaturidade"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="nivelGrauMaturidade" render={renderError}/>
                                            <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <label htmlFor="descricaoGrauMaturidade"> Descrição: </label>
                                            < Field
                                                as = "textarea"
                                                placeholder="Descrição"
                                                id="descricaoGrauMaturidade"
                                                name="descricaoGrauMaturidade"
                                                className="textarea form-control"
                                            />
                                            <ErrorMessage name="descricaoGrauMaturidade" render={renderError}/>
                                            <br></br>
                                        </div>

                                        <div className = "form-group" >
                                            <div className="row">
                                                <div className="col-6">
                                                    <label htmlFor="pontuacaoMinimaGrauMaturidade"> Pontuação Mínima(%): </label>
                                                    <Field
                                                        type = "number"
                                                        placeholder="Pontuação Mínima"
                                                        id="pontuacaoMinimaGrauMaturidade"
                                                        name="pontuacaoMinimaGrauMaturidade"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage name="pontuacaoMinimaGrauMaturidade" render={renderError}/>
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="pontuacaoMaximaGrauMaturidade"> Pontuação Máxima(%): </label>
                                                    <Field
                                                        type = "number"
                                                        placeholder="Pontuação Máxima"
                                                        id="pontuacaoMaximaGrauMaturidade"
                                                        name="pontuacaoMaximaGrauMaturidade"
                                                        className="form-control"
                                                    />
                                                    <ErrorMessage name="pontuacaoMaximaGrauMaturidade" render={renderError}/>
                                                </div>
                                            </div>
                                            <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <label htmlFor="porcentagemGrauMaturidade"> Porcentagem (%): </label>
                                            <Field
                                                type = "number"
                                                placeholder="Porcentagem"
                                                id="porcentagemGrauMaturidade"
                                                name="porcentagemGrauMaturidade"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="porcentagemGrauMaturidade" render={renderError}/>
                                            <br></br>
                                        </div>



                                        <button className="btn btn-success" type="submit" onClick={"submit"}>Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </Form>
                                </Formik>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default CreateGrauMaturidadeComponent