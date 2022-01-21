import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";
import {verificaRota} from "../auth";

class CreateCategoriaComponent extends Component {

    componentDidMount() {
        verificaRota();
    }

    saveCategoria  = (values) => {
        if (!values ) {
            this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
            try {
                CienciaAbertaService.createCategoria(values).then(res =>{
                    this.props.history.push('/categoria_list');
                });
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema ao salvar seus dados."
                });
            }
        }
    }
    cancel(){
        this.props.history.push('/');
    }
    render() {
        const validations = yup.object().shape({
            descricaoCategoriaPergunta: yup
                .string()
                .min(6,'Nome muito curto!!')
                .required('Nome categoria é obrigatório!'),
            pontosPossiveisCategoriaPergunta: yup
                .number()
                .positive('Número deve ser positivo')
                .integer("Inteiro")
                .required('Campo obrigatório!'),
        });

        const initialValues = {
            descricaoCategoriaPergunta: "",
            pontosPossiveisCategoriaPergunta: 0,
            error: "",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;

        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Adicionar Categoria</h3>

                            <div className = "card-body">
                                <Formik initialValues={initialValues} onSubmit={this.saveCategoria} validationSchema={validations}>
                                    <Form className="form">
                                        <div className = "form-group">
                                            <label htmlFor="descricaoCategoriaPergunta"> Nome Categoria: </label>
                                            <Field
                                                type= "text"
                                                placeholder="Nome Categoria"
                                                id="descricaoCategoriaPergunta"
                                                name="descricaoCategoriaPergunta"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="descricaoCategoriaPergunta" render={renderError}/>
                                            <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <label htmlFor="pontosPossiveisCategoriaPergunta"> Pontos Possíveis Categoria (%): </label>
                                            <Field
                                                type= "number"
                                                placeholder="Pontos Possíveis"
                                                id="pontosPossiveisCategoriaPergunta"
                                                name="pontosPossiveisCategoriaPergunta"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="pontosPossiveisCategoriaPergunta" render={renderError}/>
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

export default CreateCategoriaComponent