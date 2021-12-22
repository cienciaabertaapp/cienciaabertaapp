import React, { Component, useState, useContext } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import * as yup from 'yup'
import * as cors from 'cors'
import axios from "axios";
import {Grid} from "@mui/material";
import {login} from "../auth";
import {Form} from "react-bootstrap";
import api from "../api";

class LoginUsuarioComponent extends Component {

    constructor() {
        super();
      //  this.localStorage = StorageProvider;
    }

    state = {
        emailUsuario:'',
        senhaUsuario: '',
        error: ""
    };


    cancel(){
        this.props.history.push('/');
    }

    handleSubmit = async e => {

       /* console.log('login => ' + JSON.stringify(values));
        CienciaAbertaService.loginUsuario(values).then(res => {
            this.props.history.push('/usuario_list');
            console.log(res);
        });*/
        e.preventDefault();
        const { emailUsuario, senhaUsuario } = this.state;
        let parametros = {emailUsuario: emailUsuario, senhaUsuario: senhaUsuario};
        let conversao =  new URLSearchParams(Object.entries(parametros)).toString();

        try {
         const response = await CienciaAbertaService.loginUsuario(conversao);
         login(response.data.token);
         this.props.history.push("/usuario_list");

        }catch (err){
            this.setState({
                error:
                    "Houve um problema com o login, verifique suas credenciais."
            });
        }

    }

    render(){

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
                                    <Form className="form" onSubmit={this.handleSubmit}>
                                        <div  >
                                            <label> Email: </label>
                                            <input type='email'  placeholder="Email" id="emailUsuario" name="emailUsuario" className="form-control" onChange={e => this.setState({ emailUsuario: e.target.value })} />

                                        </div>

                                        <div>
                                            <label> Senha: </label>
                                            <input type='password' placeholder="Email" id="senhaUsuario" name="senhaUsuario" className="form-control" onChange={e => this.setState({ senhaUsuario: e.target.value })}/>

                                            <br></br>
                                        </div>

                                        <button onClick={"submit"} className="btn btn-success" >Entrar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </Form>
                    </Grid>
                </Grid>

            </>
        )
    }
}

export default LoginUsuarioComponent