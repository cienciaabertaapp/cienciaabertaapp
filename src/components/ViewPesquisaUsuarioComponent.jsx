import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import {BiAddToQueue} from "react-icons/bi";
import {findAllByTitle} from "@testing-library/react";
import {Form} from "formik";

class ViewPesquisaUsuarioComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            perguntas: [],
            pesquisa: [],
            nivelMaturidade:"",
            nomeUsuario:""
        }

    }

    componentDidMount() {
        CienciaAbertaService.buscaPesquisa(this.state.id).then((pes) => {
            console.log(pes.data);
            if (pes.data == ""){
                this.props.history.push('/pesquisa/' + this.state.id);
            }else {
                this.setState({
                    pesquisa: pes.data,
                    nivelMaturidade: pes.data.grauMaturidadeUsuario.nivelGrauMaturidade
                });
                CienciaAbertaService.buscaUsuario(pes.data.idUsuario).then((res) => {
                    let usuario = res.data;
                    this.setState({
                        nomeUsuario: usuario.nomeUsuario
                    });
                });
            }

            CienciaAbertaService.listPerguntas().then((res) => {
                this.setState({perguntas: res.data});
            });

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
                        <br></br>
                        <div className = "card col-md-12 offset-md-0 offset-md-0"> <h3 className="text-center">Pesquisa {this.state.pesquisa.instituicaoUsuario}</h3>

                            <b> Total de Pontos:</b> {this.state.pesquisa.pontuacaoUsuario} <br></br>
                            <b>  Nível Aderência Instituição:</b> {this.state.nivelMaturidade}<br></br>
                            <b>  Dados fornecidos por:</b> {this.state.nomeUsuario}
                            <div className = "card-body">
                                <table className = "table table-striped table-bordered">
                                    <thead>
                                    <tr>
                                        <th> Descrição</th>
                                        <th> Categoria</th>
                                        <th> Respostas</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        this.state.perguntas.map(
                                            pergunta =>
                                                <>
                                                    <tr key = {pergunta.id}>
                                                        <td > { pergunta.descricaoPergunta} </td>
                                                        <td > { pergunta.categoria.descricaoCategoriaPergunta}  </td>
                                                        <td width='20%'>

                                                            {this.state.pesquisa.respostasUsuario.map(
                                                                res =>
                                                                    res.idPergunta == pergunta.id ? //verifica se ID resposta é igual pergunta
                                                                        res.tipoPergunta == "SELECAO"? // se for selecao verifica se o status não é false
                                                                            res.estado == "true" ?
                                                                                <>{res.resposta} <br></br> </>
                                                                                : null
                                                                            :
                                                                            res.tipoPergunta == "TRUE_FALSE"? //se for TRUE_FALSE faz a tradução da resposta
                                                                                res.resposta == "true" ?
                                                                                    <>  Verdadeiro <br></br></>
                                                                                    :
                                                                                    <> Falso <br></br> </>
                                                                                :
                                                                                <>{res.resposta} <br></br> </>
                                                                        : null

                                                            )}



                                                        </td>
                                                    </tr>
                                                </>
                                        )
                                    }

                                    </tbody>
                                </table>

                                <br></br>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Voltar</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewPesquisaUsuarioComponent;