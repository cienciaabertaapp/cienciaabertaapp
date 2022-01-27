import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import {ErrorMessage, Field, Form, Formik} from "formik";
import {parseJwt} from "../auth";

class UpdateUsuarioComponent extends Component {

    constructor(props) {
        super(props)
            this.state = {
                id: this.props.match.params.id,
            }

    }

    componentDidMount(){
        CienciaAbertaService.buscaUsuario(this.state.id).then( (res) =>{
            let usuario = res.data;
            this.setState({
                nomeUsuario: usuario.nomeUsuario,
                emailUsuario: usuario.emailUsuario,
                instituicaoUsuario: usuario.instituicaoUsuario,
                ocupacaoUsuario: usuario.ocupacaoUsuario,
                permissaoDivulgacaoDadosUsuario: usuario.permissaoDivulgacaoDadosUsuario.toString()
            });
        });
    }


    saveUsuario = (values) => {
       // debugger;
        CienciaAbertaService.updateUsuario(this.state.id,values).then(res =>{
         //   console.log("chegou aqui");
           // CienciaAbertaService.updateDivulgaResposta(this.state.id, values.permissaoDivulgacaoDadosUsuario);

            if (parseJwt() == "ADMIN")
               this.props.history.push('/usuario_list/');
            else
                this.props.history.push("/pesquisa_usuario/"+ this.state.id);
        });
    }

    cancel(){
        this.props.history.push('/');
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
            nomeUsuario: this.state.nomeUsuario,
            emailUsuario: this.state.emailUsuario,
            instituicaoUsuario: this.state.instituicaoUsuario,
            ocupacaoUsuario: this.state.ocupacaoUsuario,
            permissaoDivulgacaoDadosUsuario: this.state.permissaoDivulgacaoDadosUsuario,
            error:"",
        };

        const renderError = (message) => <p style={{fontSize: "small", color:"red"}}>{message}</p>;

        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Alterar Usuário</h3>

                                <div className = "card-body">
                                    <Formik enableReinitialize initialValues={initialValues} onSubmit={this.saveUsuario} validationSchema={validations}>
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

                                            <div className = "form-group">
                                                <label htmlFor="permissaoDivulgacaoDadosUsuario"> Permissão para divulgação de dados: </label><br></br>
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

export default UpdateUsuarioComponent;