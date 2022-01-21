import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {verificaRota} from "../auth";

class UpdateApresentacaoComponent extends Component {

    constructor(props) {
        super(props)
            this.state = {
                id: this.props.match.params.id,
            }
    }

    componentDidMount(){
        verificaRota();
        CienciaAbertaService.buscaApresentacao(this.state.id).then( (res) =>{
            let apresentacao = res.data;
            this.setState({
                descricaoApresentacao: apresentacao.descricaoApresentacao
            });

        });

    }


    saveApresentacao = (values) => {
        CienciaAbertaService.updateApresentacao(this.state.id,values).then(res =>{
            this.props.history.push('/apresentacao_list');
        });
    }


    cancel(){
        this.props.history.push('/apresentacao_list');
    }
    render() {
        const validations = yup.object().shape({
            descricaoApresentacao: yup
                .string()
                .min(6,'Nome muito curto!!')
                .required('Nome apresentacao é obrigatório!'),
        });

        const initialValues = {
            descricaoApresentacao: this.state.descricaoApresentacao,
            error: "",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;


        return (
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Alterar Apresentacão</h3>

                                <div className = "card-body">
                                    <Formik enableReinitialize initialValues={initialValues} onSubmit={this.saveApresentacao} validationSchema={validations}>
                                        <Form className="form">
                                            <div className = "form-group">
                                                <label htmlFor="descricaoApresentacao"> Descrição: </label>
                                                <Field
                                                    as="textarea"
                                                    placeholder="Descrição"
                                                    id="descricaoApresentacao"
                                                    name="descricaoApresentacao"
                                                    className="form-control"
                                                />
                                                <ErrorMessage name="descricaoApresentacao" render={renderError}/>
                                                <br></br>
                                            </div>


                                            <button className="btn btn-success" type="submit" onClick={"submit"}>Salvar</button>
                                            <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>

        )
    }
}

export default UpdateApresentacaoComponent;