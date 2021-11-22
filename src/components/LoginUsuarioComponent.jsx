import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form"; 

class LoginUsuarioComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleEmailUsuarioChange = (event) => {
        this.setState ({emailUsuario: event.target.value});
    }

    handleSenhaUsuarioChange = (event) => {
        this.setState ({senhaUsuario: event.target.value});
    }

    saveUsuario = (e) => {
        e.preventDefault();
        let usuario = {
             nomeUsuario: this.state.nomeUsuario,
             emailUsuario: this.state.emailUsuario,
             instituicaoUsuario: this.state.instituicaoUsuario,
             ocupacaoUsuario: this.state.ocupacaoUsuario,
             senhaUsuario: this.state.senhaUsuario,
             permissaoDivulgacaoDadosUsuario: this.state.permissaoDivulgacaoDadosUsuario};
        console.log('usuario => ' + JSON.stringify(usuario));

        CienciaAbertaService.createUsuario(usuario).then(res =>{
            this.props.history.push('/pesquisa');
        });
    }
    cancel(){
        this.props.history.push('/');
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Acessar minha área</h3>

                                <div className = "card-body">
                                    <form>

                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" id="emailUsuario" name="emailUsuario" className="form-control"
                                                   value={this.state.emailUsuario} onChange={this.handleEmailUsuarioChange}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Senha: </label>
                                            <input type="password" placeholder="Senha" id="senhaUsuario" name="senhaUsuario" className="form-control"
                                                   value={this.state.senhaUsuario} onChange={this.handleSenhaUsuarioChange} />

                                            <br></br>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveUsuario}>Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default LoginUsuarioComponent