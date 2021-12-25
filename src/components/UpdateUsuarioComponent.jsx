import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form"; 

class UpdateUsuarioComponent extends Component {

    constructor(props) {
        super(props)
            this.state = {
                id: this.props.match.params.id,
                nomeUsuario: '',
                emailUsuario: '',
                instituicaoUsuario: '',
                ocupacaoUsuario: '',
                permissaoDivulgacaoDadosUsuario: ''
            }
            this.handleNomeUsuarioChange = this.handleNomeUsuarioChange.bind(this);
            this.handleEmailUsuarioChange = this.handleEmailUsuarioChange.bind(this);
            this.handleInstituicaoUsuarioChange = this.handleInstituicaoUsuarioChange.bind(this);
            this.handleOcupacaoUsuarioChange = this.handleOcupacaoUsuarioChange.bind(this);
            this.handlerPermissaoDivulgacaoDadosUsuarioChange = this.handlerPermissaoDivulgacaoDadosUsuarioChange.bind(this);

    }

    componentDidMount(){

        CienciaAbertaService.buscaUsuario(this.state.id).then( (res) =>{
            let usuario = res.data;
            this.setState({nomeUsuario: usuario.nomeUsuario,
                emailUsuario: usuario.emailUsuario,
                instituicaoUsuario: usuario.instituicaoUsuario,
                ocupacaoUsuario: usuario.ocupacaoUsuario,
                permissaoDivulgacaoDadosUsuario: usuario.permissaoDivulgacaoDadosUsuario.toString()
            });
        });
    }


    saveUsuario = (e) => {
        e.preventDefault();
        let usuario = {
             nomeUsuario: this.state.nomeUsuario,
             emailUsuario: this.state.emailUsuario,
             instituicaoUsuario: this.state.instituicaoUsuario,
             ocupacaoUsuario: this.state.ocupacaoUsuario,
             permissaoDivulgacaoDadosUsuario: this.state.permissaoDivulgacaoDadosUsuario};
        console.log('usuario => ' + JSON.stringify(usuario));

        CienciaAbertaService.updateUsuario(this.state.id,usuario).then(res =>{
            this.props.history.push('/usuario_list');
        });
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
    handlerPermissaoDivulgacaoDadosUsuarioChange= (event) => {
        this.setState({permissaoDivulgacaoDadosUsuario: event.target.value});
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
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Alterar Usuário</h3>

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
                                            <label> Permissão para divulgação de dados: </label><br></br>
                                            <tbody><tr>
                                                <td width="50%">
                                                    <input type="radio" placeholder="Permissão divulgação" id="permissaoDivulgacaoDadosUsuario"
                                                           name="permissaoDivulgacaoDadosUsuario" value="true" onChange={this.handlerPermissaoDivulgacaoDadosUsuarioChange} checked={this.state.permissaoDivulgacaoDadosUsuario == "true"}/> SIM
                                                </td>
                                                <td width="50%">
                                                    <input type="radio" placeholder="Permissão divulgação" id="permissaoDivulgacaoDadosUsuario"
                                                           name="permissaoDivulgacaoDadosUsuario" value="false" onChange={this.handlerPermissaoDivulgacaoDadosUsuarioChange} checked={this.state.permissaoDivulgacaoDadosUsuario  == "false"}  /> NÃO
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

export default UpdateUsuarioComponent;