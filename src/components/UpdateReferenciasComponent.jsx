import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {getToken, verificaRota} from "../auth";

class UpdateReferenciasComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
        }
    }

    componentDidMount(){
        verificaRota();
        CienciaAbertaService.buscaReferencias(this.state.id).then( (res) =>{
            let referencias = res.data;
            this.setState({
                descricaoReferencias: referencias.descricaoReferencias
            });

        });

    }


    saveReferencias = (values) => {
        CienciaAbertaService.updateReferencias(this.state.id,values).then(res =>{
            this.props.history.push('/referencias_list');
        });
        console.log(getToken());
    }


    cancel(){
        this.props.history.push('/referencias_list');
    }
    render() {
        const validations = yup.object().shape({
            descricaoReferencias: yup
                .string()
                .min(6,'Nome muito curto!!')
                .required('Nome referencias é obrigatório!'),
        });

        const initialValues = {
            descricaoReferencias: this.state.descricaoReferencias,
            error: "",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;


        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Alterar Referências</h3>

                            <div className = "card-body">
                                <Formik enableReinitialize initialValues={initialValues} onSubmit={this.saveReferencias} validationSchema={validations}>
                                    <Form className="form">
                                        <div className = "form-group">
                                            <label htmlFor="descricaoReferencias"> Descrição: </label>
                                            <Field
                                                as = "textarea"
                                                placeholder="Descrição"
                                                id="descricaoReferencias"
                                                name="descricaoReferencias"
                                                className="form-control"
                                            />
                                            <ErrorMessage name="descricaoReferencias" render={renderError}/>
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

export default UpdateReferenciasComponent;