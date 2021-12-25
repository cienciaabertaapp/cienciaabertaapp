import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import {Link} from "react-router-dom";
import {BiAddToQueue} from "react-icons/bi";

class ViewPerguntaComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id
        }

    }

    componentDidMount() {

        CienciaAbertaService.buscaPergunta(this.state.id).then((res) => {
            let pergunta = res.data;
            this.setState({
                descricaoPergunta: pergunta.descricaoPergunta,
                descricaoCategoriaPergunta: pergunta.categoria.descricaoCategoriaPergunta,
                perguntaTipoPergunta: pergunta.perguntaTipoPergunta,
                respostasPossiveisPergunta: pergunta.respostasPossiveisPergunta

            });

            if (this.state.perguntaTipoPergunta == "TRUE_FALSE") {
                this.setState({tipoPergunta: "True ou False"});
                this.setState({mostraAlternativas: false});
                this.setState({tipoAlternativa: false});
            } else if (this.state.perguntaTipoPergunta == "ALTERNATIVE") {
                this.setState({tipoPergunta: "Alternativas"});
                this.setState({mostraAlternativas: true});
                this.setState({tipoAlternativa: true});
            }else if (this.state.perguntaTipoPergunta == "SELECAO") {
                this.setState({tipoPergunta: "Selação"});
                this.setState({mostraAlternativas: true});
                this.setState({tipoAlternativa: false});
            }else if (this.state.perguntaTipoPergunta == "ABERTA") {
                this.setState({tipoPergunta: "Aberta"});
                this.setState({mostraAlternativas: false});
                this.setState({tipoAlternativa: false});
            }

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
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Visualiza Pergunta</h3>

                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <h5> Descrição da Pergunta </h5>
                                        <label>{this.state.descricaoPergunta}</label>
                                        <br></br> <br></br>
                                    </div>

                                    <div className = "form-group">
                                        <h5> Categoria </h5>
                                        <label>{this.state.descricaoCategoriaPergunta}</label>
                                        <br></br> <br></br>
                                    </div>

                                    <div className = "form-group">
                                        <h5> Tipo de Pergunta </h5>
                                        <label>{this.state.tipoPergunta} </label>
                                        <br></br> <br></br>
                                    </div>

                                    { this.state.mostraAlternativas ?
                                        <>
                                            <div className = "form-group">
                                                <h5> Alternativas </h5>

                                                {this.state.respostasPossiveisPergunta.map(
                                                    alternativas =>
                                                        <>
                                                            <label>
                                                                { this.state.tipoAlternativa ?  <>  ({alternativas.id}) </> :  null }
                                                                {alternativas.descricaoRespostasPossiveis} </label>
                                                            <br></br> <br></br>
                                                        </>
                                                ) }
                                            </div>
                                        </>
                                        : null
                                    }

                                    <Link to ={{pathname:'/pergunta_edit/'+this.state.id}}>   <button className="btn btn-info" >Alterar</button> < /Link>
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

export default ViewPerguntaComponent;