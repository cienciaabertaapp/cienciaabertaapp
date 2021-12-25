import React, { Component, useState, useContext, useEffect } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import * as yup from 'yup'
import * as cors from 'cors'
import axios from "axios";
import {Grid} from "@mui/material";
import {login} from "../auth";
import api from "../api";
import { Formik, Form, Field, ErrorMessage} from "formik";


class LoginUsuarioComponent extends Component {

    state = {
        emailUsuario:'',
        senhaUsuario: '',
        error: ""
    };

    cancel(){
        this.props.history.push('/');
    }

    handleSubmit = async (values) => {

        let conversao =  new URLSearchParams(Object.entries(values)).toString();
        try {
            const response = await CienciaAbertaService.loginUsuario(conversao);
            login(response.data.token);
            window.location.href = "usuario_list";

        }catch (err){
            this.setState({
                error:
                    "Houve um problema com o login, verifique suas credenciais."
            });
        }
    }

    render(){
        const validations = yup.object().shape({
            emailUsuario: yup.string().email().required(),
            senhaUsuario: yup.string().min(3).required()
        })

        return (

            <>
                <br></br>
                <Grid container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item xs={6}>
                        <h3 className="text-center">Acessar minha área</h3>
                        {this.state.error && <p>{this.state.error}</p>}
                        <Formik initialValues={{}} onSubmit={this.handleSubmit} validationSchema={validations}>
                            <Form className="form">
                                <div className="formField">
                                    <label htmlFor="emailUsuario"> Email: </label>
                                    <Field
                                        type= "text"
                                        placeholder="Email"
                                        name="emailUsuario"
                                        id="emailUsuario"
                                       // value={this.state.emailUsuario}
                                        className="form-control"
                                       // onChange={e => this.setState({ emailUsuario: e.target.value })}
                                    />
                                    <ErrorMessage componet="span" name="emailUsuario" className="Form-Field"/>

                                </div>

                                <div>

                                    <label htmlFor="senhaUsuario"> Senha: </label>
                                    <Field
                                        type='password'
                                        placeholder="Senha"
                                        name="senhaUsuario"
                                        id="senhaUsuario"
                                        className="form-control"
                                      //  value={this.state.senhaUsuario}
                                       // onChange={e => this.setState({ senhaUsuario: e.target.value })}
                                    />
                                    <ErrorMessage componet="span" name="senhaUsuario" className="Form-Field"/>

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