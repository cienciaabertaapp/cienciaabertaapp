import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import {verificaRota} from "../auth";

class ViewUsuarioComponent extends Component {

    constructor(props) {
        super(props)
            this.state = {
                id: this.props.match.params.id
            }

    }

    componentDidMount(){
        verificaRota();
        CienciaAbertaService.buscaUsuario(this.state.id).then( (res) =>{
            let usuario = res.data;
            this.setState({nomeUsuario: usuario.nomeUsuario,
                emailUsuario: usuario.emailUsuario,
                instituicaoUsuario: usuario.instituicaoUsuario,
                ocupacaoUsuario: usuario.ocupacaoUsuario,
                permissaoDivulgacaoDadosUsuario: usuario.permissaoDivulgacaoDadosUsuario.toString()
            });

            if (this.state.permissaoDivulgacaoDadosUsuario == "true"){
                this.setState({permitir: "Sim"});
            }else{
                this.setState({permitir: "Não"});
            }
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
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Visualiza Usuário</h3>

                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <h5> Nome Completo </h5>
                                            <label>{this.state.nomeUsuario}</label>
                                            <br></br> <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <h5> Email </h5>
                                            <label>{this.state.emailUsuario}</label>
                                            <br></br> <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <h5> Instituição Avaliada</h5>
                                             <label>{this.state.instituicaoUsuario} </label>
                                            <br></br> <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <h5> Ocupação </h5>
                                            <label>{this.state.ocupacaoUsuario} </label>
                                            <br></br> <br></br>

                                        </div>


                                        <div className = "form-group">
                                            <h5> Permissão para divulgação de dados </h5>
                                            <label>{this.state.permitir}</label>
                                            <br></br><br></br> <br></br>
                                        </div>


                                    <Link to ={{pathname:'/usuario_edit/'+this.state.id}}>   <button className="btn btn-info" >Alterar</button> < /Link>
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

export default ViewUsuarioComponent;