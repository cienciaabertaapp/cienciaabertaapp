import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form"; 

class CreateUsuarioComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleNomeUsuarioChange = (event) => {
        this.setState ({nomeUsuario: event.target.value});
    }
    handleEmailUsuarioChange = (event) => {
        this.setState ({emailUsuario: event.target.value});
    }
    handleInstituicaoUsuarioChange = (event) => {
        this.setState ({instituicaoUsuario: event.target.value});
    }
    handleOcupacaoUsuarioChange = (event) => {
        this.setState ({ocupacaoUsuario: event.target.value});
    }
    handleSenhaUsuarioChange = (event) => {
        this.setState ({senhaUsuario: event.target.value});
    }
    handlerPermissaoDivulgacaoDadosUsuarioChange= (event) => {
        this.setState({permissaoDivulgacaoDadosUsuario: event.target.value});
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
       // console.log('usuario => ' + JSON.stringify(usuario));

        CienciaAbertaService.createUsuario(usuario).then(res =>{
        //    console.log(res.data.id);
           this.props.history.push('/pesquisa/'+ res.data.id);
        });
    }
    cancel(){
        this.props.history.push('/usuario_list');
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Adicionar Usuário</h3>

                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Nome Completo: </label>
                                            <input placeholder="Nome Completo" id="nomeUsuario" name="nomeUsuario" className="form-control"
                                                   value = {this.state.nomeUsuario} onChange = {this.handleNomeUsuarioChange}  />
                                        </div>

                                        <div className = "form-group">
                                            <label> Email: </label>
                                            <input placeholder="Email" id="emailUsuario" name="emailUsuario" className="form-control"
                                                   value={this.state.emailUsuario} onChange={this.handleEmailUsuarioChange}/>
                                        </div>

                                        <div className = "form-group">
                                            <label> Instituição: </label>
                                            <input placeholder="Instituição" id="instituicaoUsuario" name="instituicaoUsuario" className="form-control"
                                                   value={this.state.instituicaoUsuario} onChange={this.handleInstituicaoUsuarioChange} />
                                        </div>

                                        <div className = "form-group">
                                            <label> Ocupação: </label>
                                            <input placeholder="Ocupação" id="ocupacaoUsuario" name="ocupacaoUsuario" className="form-control"
                                                   value={this.state.ocupacaoUsuario} onChange={this.handleOcupacaoUsuarioChange} />
                                        </div>

                                        <div className = "form-group">
                                            <label> Senha: </label>
                                            <input type="password" placeholder="Senha" id="senhaUsuario" name="senhaUsuario" className="form-control"
                                                   value={this.state.senhaUsuario} onChange={this.handleSenhaUsuarioChange} />
                                        </div>


                                        <div className = "form-group">
                                            <label> Permissão para divulgação de dados: </label><br></br>
                                            <tbody><tr>
                                                <td width="50%">
                                                    <input type="radio" placeholder="Permissão divulgação" id="permissaoDivulgacaoDadosUsuarioTrue"
                                                           name="permissaoDivulgacaoDadosUsuario" value="true" onChange={this.handlerPermissaoDivulgacaoDadosUsuarioChange}/> SIM
                                                </td>
                                                <td width="50%">
                                                    <input type="radio" placeholder="Permissão divulgação" id="permissaoDivulgacaoDadosUsuarioFalse"
                                                           name="permissaoDivulgacaoDadosUsuario" value="false" onChange={this.handlerPermissaoDivulgacaoDadosUsuarioChange}/> NÃO
                                                </td>
                                            </tr></tbody>
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

export default CreateUsuarioComponent