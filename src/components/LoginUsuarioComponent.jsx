import React, { Component, useState, useContext, useEffect } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import * as yup from 'yup'
import * as cors from 'cors'
import axios from "axios";
import {Grid} from "@mui/material";
import {login, TOKEN_KEY} from "../auth";
import api, {CIENCIAABERTA_API_BASE_URL} from "../api";
import { Formik, Form, Field, ErrorMessage} from "formik";
import {ID_USUARIO, usuario} from "../dadosGlobais";
import {Redirect} from "react-router-dom";


class LoginUsuarioComponent extends Component {

    state = ({errors:""});

    cancel(){
        this.props.history.push('/');
    }

    handleSubmit = async (values) => {
         if (!values ) {
            this.setState({ errors: "Preencha todos os dados para se cadastrar" });
        } else {
            let conversao =  new URLSearchParams(values).toString();
            try {
                const response = await CienciaAbertaService.loginUsuario(conversao);
                let tipoUsuario = login(response.data.access_token);
                if (tipoUsuario == "ADMIN"){
                    window.location.pathname = "/usuario_list";
                }else{
                    CienciaAbertaService.buscaUsuarioLogin(values.emailUsuario).then( res => {
                        usuario(res.data.id);
                        window.location.pathname = "/usuario_edit/"+ res.data.id;
                    });
                }
            } catch (err) {
                this.setState({
                    errors:
                        "Houve um problema com o login, verifique suas credenciais."
                });
            }
        }
    }

    render(){
        const validations = yup.object().shape({
            emailUsuario: yup
                .string()
                .email('Coloque um email válido!!')
                .required('Email é um campo obrigatório!'),
            senhaUsuario: yup
                .string()
                .min(3,'Senha muito curta.')
                .required('Senha é um campo obrigatório!')
        });

        const initialValues = {
            senhaUsuario: "",
            emailUsuario: "",
            error:"",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;
        return (

            <>
                <br></br>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item xs={6}>
                        <h3 className="text-center">Acessar minha área</h3>
                        {this.state.errors && <p>{this.state.errors}</p>}
                        <Formik initialValues={initialValues} onSubmit={this.handleSubmit} validationSchema={validations}>
                            <Form className="form">
                                <div className="formField">
                                    <label htmlFor="emailUsuario"> Email: </label>
                                    <Field
                                        type= "text"
                                        placeholder="Email"
                                        name="emailUsuario"
                                        id="emailUsuario"
                                        className="form-control"
                                        // onChange={e => this.setState({ emailUsuario: e.target.value })}
                                    />

                                    <ErrorMessage name="emailUsuario" render={renderError}/>
                                </div>

                                <div>

                                    <label htmlFor="senhaUsuario"> Senha: </label>
                                    <Field
                                        type='password'
                                        placeholder="Senha"
                                        name="senhaUsuario"
                                        id="senhaUsuario"
                                        className="form-control"
                                        // onChange={e => this.setState({ senhaUsuario: e.target.value })}
                                    />
                                    <ErrorMessage name="senhaUsuario" render={renderError}/>

                                    <br></br>
                                </div>

                                <button onClick={"submit"} className="btn btn-success" >Entrar</button>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                            </Form>

                        </Formik>

                    </Grid>
                </Grid>

            </>

        )
    }
}

export default LoginUsuarioComponent