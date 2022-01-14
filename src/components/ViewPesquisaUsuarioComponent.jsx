import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import {BiAddToQueue} from "react-icons/bi";
import {findAllByTitle} from "@testing-library/react";

class ViewPesquisaUsuarioComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            perguntas: [],
            pesquisa: [],
            nivelMaturidade:""
        }

    }

    componentDidMount() {
        CienciaAbertaService.buscaPesquisa(this.state.id).then((pes) => {
            this.setState({pesquisa: pes.data,
            nivelMaturidade:pes.data.grauMaturidadeUsuario.nivelGrauMaturidade

            });

            console.log(pes.data.grauMaturidadeUsuario.nivelGrauMaturidade);
        });
        CienciaAbertaService.listPerguntas().then((res) => {
            this.setState({perguntas: res.data});
        });
    }


    editaUsuario (id){
        // console.log("teste",id);
        //  console.log('/usuario_edit/'+id);
        //  this.props.history.push("/usuario_edit/"+id);
    }

    cancel(){
        this.props.history.push('/perguntas_list');
    }
    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-12 offset-md-0 offset-md-0"> <h3 className="text-center">Minha Pesquisa</h3>

                           <b> Total de Pontos:</b> {this.state.pesquisa.pontuacaoUsuario} <br></br>
                            <b>  Nível Maturidade Instituição:</b> {this.state.nivelMaturidade}
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
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewPesquisaUsuarioComponent;