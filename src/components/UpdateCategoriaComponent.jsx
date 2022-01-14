import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";

class UpdateCategoriaComponent extends Component {

    constructor(props) {
        super(props)
            this.state = {
                id: this.props.match.params.id,
            }
    }

    componentDidMount(){

        CienciaAbertaService.buscaCategoria(this.state.id).then( (res) =>{
            let categoria = res.data;
            this.setState({
                descricaoCategoriaPergunta: categoria.descricaoCategoriaPergunta,
                pontosPossiveisCategoriaPergunta: categoria.pontosPossiveisCategoriaPergunta
            });

        });

    }


    saveCategoria = (values) => {
        CienciaAbertaService.updateCategoria(this.state.id,values).then(res =>{
            this.props.history.push('/categoria_list');
        });
    }


    cancel(){
        this.props.history.push('/categoria_list');
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
            descricaoCategoriaPergunta: this.state.descricaoCategoriaPergunta,
            pontosPossiveisCategoriaPergunta: this.state.pontosPossiveisCategoriaPergunta,
            error: "",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;


        return (
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Alterar Categoria</h3>

                                <div className = "card-body">
                                    <Formik enableReinitialize initialValues={initialValues} onSubmit={this.saveCategoria} validationSchema={validations}>
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

        )
    }
}

export default UpdateCategoriaComponent;