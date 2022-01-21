import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Formik, Form, Field, ErrorMessage} from "formik";
import {verificaRota} from "../auth";

class CreateGlossarioComponent extends Component {

    componentDidMount() {
        verificaRota();
    }

    saveGlossario  = (values) => {
        if (!values ) {
            this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
            try {
                CienciaAbertaService.createGlossario(values).then(res =>{
                    this.props.history.push('/glossario_list');
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
            descricaoGlossario: yup
                .string()
                .min(6,'Nome muito curto!!')
                .required('Nome glossario é obrigatório!'),
        });

        const initialValues = {
            descricaoGlossario: "",
            error: "",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;

        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Adicionar Glossário</h3>

                            <div className = "card-body">
                                <Formik initialValues={initialValues} onSubmit={this.saveGlossario} validationSchema={validations}>
                                    <Form className="form">
                                        <div className = "form-group">
                                            <label htmlFor="descricaoGlossario"> Descrição: </label>
                                            <Field
                                                as= "textarea"
                                                placeholder="Descrição"
                                                id="descricaoGlossario"
                                                name="descricaoGlossario"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="descricaoGlossario" render={renderError}/>
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

export default CreateGlossarioComponent