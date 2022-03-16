import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { Formik, Form, Field, ErrorMessage} from "formik";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {Grid} from "@mui/material";
import {verificaRota} from "../auth";

class CreateUsuarioComponent extends Component {

    state = {
    };

    saveUsuario = (values) => {
       // console.log(values);
        if (!values ) {
            this.setState({ error: "Preencha todos os dados para se cadastrar" });
        } else {
            try {
                CienciaAbertaService.createUsuario(values).then(res => {
                    //    console.log(res.data.id);
                    this.props.history.push('/pesquisa/' + res.data.id);
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
        this.props.history.push('/usuario_list');
    }
    render() {
        const validations = yup.object().shape({
            nomeUsuario: yup
                .string()
                .min(6,'Nome muito curto!!')
                .required('Email é um campo obrigatório!'),
            emailUsuario: yup
                .string()
                .email('Coloque um email válido!!')
                .required('Email é um campo obrigatório!'),
            senhaUsuario: yup
                .string()
                .min(3,'Senha muito curta.')
                .required('Senha é um campo obrigatório!'),
            instituicaoUsuario: yup
                .string()
                .min(3,'Inválido.')
                .required('Campo obrigatório!'),
            ocupacaoUsuario: yup
                .string()
                .min(3,'Inválido.')
                .required('Campo obrigatório!'),
            permissaoDivulgacaoDadosUsuario: yup
                .boolean()
                .required('Campo obrigatório!'),

        });

        const initialValues = {
            nomeUsuario: "",
            emailUsuario: "",
            senhaUsuario: "",
            instituicaoUsuario: "",
            ocupacaoUsuario: "",
            permissaoDivulgacaoDadosUsuario: '',
            error:"",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;

        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-10 offset-md-1 offset-md-1"> <h3 className="text-center">Adicionar Usuário</h3>

                            {this.state.error && <p>{this.state.error}</p>}
                            <div className = "card-body">
                                <Formik initialValues={initialValues} onSubmit={this.saveUsuario} validationSchema={validations}>
                                    <Form className="form">
                                        <div className="formField">
                                            <label htmlFor="nomeUsuario"> Nome Completo: </label>
                                            <Field
                                                type= "text"
                                                placeholder="Nome"
                                                name="nomeUsuario"
                                                id="nomeUsuario"
                                                className="form-control"
                                                // onChange={e => this.setState({ emailUsuario: e.target.value })}
                                            />
                                            <ErrorMessage name="nomeUsuario" render={renderError}/>
                                        </div>

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

                                        <div className="formField">
                                            <label htmlFor="instituicaoUsuario"> Instituição: </label>
                                            <Field
                                                type= "text"
                                                placeholder="Instituição"
                                                name="instituicaoUsuario"
                                                id="instituicaoUsuario"
                                                className="form-control"
                                                // onChange={e => this.setState({ emailUsuario: e.target.value })}
                                            />

                                            <ErrorMessage name="instituicaoUsuario" render={renderError}/>
                                        </div>

                                        <div className="formField">
                                            <label htmlFor="ocupacaoUsuario"> Ocupação: </label>
                                            <Field
                                                type= "text"
                                                placeholder="Ocupação"
                                                name="ocupacaoUsuario"
                                                id="ocupacaoUsuario"
                                                className="form-control"
                                                // onChange={e => this.setState({ emailUsuario: e.target.value })}
                                            />

                                            <ErrorMessage name="ocupacaoUsuario" render={renderError}/>
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
                                            <ErrorMessage name="senhaUsuario" render={renderError} />

                                        </div>


                                        <div className = "form-group">
                                            <br></br>
                                            <label htmlFor="permissaoDivulgacaoDadosUsuario" style={{textAlign:'justify'}}>
                                                Os dados coletados por meio deste roteiro de avaliação da aderência à Ciência Aberta serão destinados
                                                às finalidades propostas por esse aplicativo web. Serão publicadas as respostas atribuídas a cada questão,
                                                o nível de aderência alcançado pela instituição analisada, a pontuação obtida e quem forneceu os dados.
                                                Antes de iniciar o preenchimento, é preciso que você registre sua decisão no Termo de Consentimento Livre e Esclarecido (TCLE).
                                                <br></br>
                                                Permissão para divulgação de dados:</label><br></br>
                                            <tbody><tr>
                                                <td width="50%">
                                                    <Field
                                                        type="radio"
                                                        placeholder="Permissão divulgação"
                                                        id="permissaoDivulgacaoDadosUsuarioTrue"
                                                        name="permissaoDivulgacaoDadosUsuario"
                                                        value="true"
                                                        // onChange={this.handlerPermissaoDivulgacaoDadosUsuarioChange}
                                                    /> SIM
                                                </td>
                                                <td width="50%">
                                                    <Field
                                                        type="radio"
                                                        placeholder="Permissão divulgação"
                                                        id="permissaoDivulgacaoDadosUsuarioFalse"
                                                        name="permissaoDivulgacaoDadosUsuario"
                                                        value="false"
                                                        // onChange={this.handlerPermissaoDivulgacaoDadosUsuarioChange}
                                                    /> NÃO


                                                </td>
                                            </tr></tbody>

                                            <ErrorMessage name="permissaoDivulgacaoDadosUsuario" render={renderError}/>
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

export default CreateUsuarioComponent