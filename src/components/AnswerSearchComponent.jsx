import React, {Component, useState, CheckBox} from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import {useForm} from "react-hook-form";
import {Grid} from "@mui/material";

class AnswerSearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            idUsuario: this.props.match.params.id,
            perguntas: [],
            categorias: [],
            perguntasCategoria: [],
            quantidadeSteps: null,
            stepAtual: 0,
            alternativasCategoria: [],
            categoriaAtual: '',
            respostasAlternative: [] = [],
            respostasSelecao: [] = [],
            respostasTrueFalse: [] = [],
            respostasAberta: [] = [],
            respostas: [] = [],
            trueFalse: null,
            alternative: null,
            selecao: null,
            error: "",
            qtdPerguntaCategoria: 0
        }
    }

    //monta pesquisa pagina iniial
    componentDidMount() {
        CienciaAbertaService.listCategoria().then((res) => {
            this.setState({categorias: res.data});
            this.setState({
                quantidadeSteps: this.state.categorias.length - 1,
                categoriaAtual: this.state.categorias[this.state.stepAtual].descricaoCategoriaPergunta
            });
            CienciaAbertaService.buscaPerguntasCategoria(this.state.categorias[this.state.stepAtual].id).then((res) => {
                this.setState({
                    perguntasCategoria: res.data,
                    qtdPerguntaCategoria: res.data.length
                });

            });
        });
    }

    proximoStep = (e, step) => {
        e.preventDefault();

        if (this.state.respostas.length < this.state.qtdPerguntaCategoria) {
            this.setState({error: "Preencha todos os campos"});
        } else {
            this.setState({error: ""});
            this.setState({stepAtual: step})
            this.setState({categoriaAtual: this.state.categorias[step].descricaoCategoriaPergunta});
            CienciaAbertaService.buscaPerguntasCategoria(this.state.categorias[step].id).then((res) => {
                this.setState({
                    perguntasCategoria: res.data,
                    qtdPerguntaCategoria: this.state.qtdPerguntaCategoria + res.data.length
                });
            });
        }
    }
    anteriorStep = (e, step) => {
        e.preventDefault();
        this.setState({
            stepAtual: step
        })
        this.setState({categoriaAtual: this.state.categorias[step].descricaoCategoriaPergunta});
        CienciaAbertaService.buscaPerguntasCategoria(this.state.categorias[step].id).then((res) => {
            this.setState({
                perguntasCategoria: res.data,
                qtdPerguntaCategoria: res.data.length,
                qtdPerguntasRespondidasCategoria: res.data.length
            });
            this.setState({error: ""});
        });
    }

// ----------------------------- ALTERNATIVE
    onChangeAlternative = (e, idPergunta, idAlternativa, idCategoria) => {
        this.setState({alternative: e.target.value});
        let inserirAlternative = true;
        this.state.respostas.map(res => {
            if ((res.idPergunta == idPergunta)) {
                res.resposta = e.target.value;
                res.idAlternativa = idAlternativa;
                inserirAlternative = false;
                return res
            }
        })
        if (inserirAlternative) {
            this.state.respostas.push({
                "idPergunta": idPergunta,
                "idCategoria": idCategoria,
                "tipoPergunta": "ALTERNATIVE",
                "idAlternativa": idAlternativa,
                "resposta": e.target.value,
                "estado": 'true'
            });
        }
    }


// ----------------------------- ABERTA
    onChangeAberta = (e, idPergunta, idCategoria) => {
        this.setState({aberta: e.target.value});
        let inserirAberta = true;
        this.state.respostas.map(res => {
            if ((res.idPergunta == idPergunta)) {
                res.resposta = e.target.value;
                inserirAberta = false;
                return res
            }
        })
        if (inserirAberta) {
            this.state.respostas.push({
                "idPergunta": idPergunta,
                "idCategoria": idCategoria,
                "tipoPergunta": "ABERTA",
                "resposta": e.target.value
            });
        }
    }
// ----------------------------- TRUE-FALSE
    onChangeTrueFalse = (e, idPergunta, idCategoria) => {

        this.setState({trueFalse: e.target.value});
        let inserirTrueFalse = true;
        this.state.respostas.map(res => {
            if (res.idPergunta == idPergunta) {
                res.resposta = e.target.value;
                inserirTrueFalse = false;
                return res
            }
        })
        if (inserirTrueFalse) {
            this.state.respostas.push({
                "idPergunta": idPergunta,
                "idCategoria": idCategoria,
                "tipoPergunta": "TRUE_FALSE",
                "resposta": e.target.value
            });
        }
    }
// ----------------------------- SELEÇÃO
    onChangeSelecao = (e, idPergunta, idAlternativa, idCategoria) => {
        this.setState({selecao: e.target.value});
        let inserirSelecao = true;
        this.state.respostas.map(res => {
            if ((res.idPergunta == idPergunta) && (res.idAlternativa == idAlternativa)) {
                res.estado = !res.estado;
                inserirSelecao = false;
                return res
            }
        })
        if (inserirSelecao) {
            this.state.respostas.push({
                "idPergunta": idPergunta,
                "idCategoria": idCategoria,
                "tipoPergunta": "SELECAO",
                "idAlternativa": idAlternativa,
                "resposta": e.target.value,
                "estado": "true"
            });
        }
    }

    salvaPesquisa = (e) => {

        e.preventDefault();
        if (this.state.respostas.length < this.state.qtdPerguntaCategoria) {
            this.setState({error: "Preencha todos os campos"});
        } else {
            this.setState({error: ""});
            let respostasUsuario = {
                idUsuario: this.state.idUsuario,
                respostasUsuario: this.state.respostas
            };
            CienciaAbertaService.createResposta(respostasUsuario).then(res => {
                CienciaAbertaService.enviaEmail(this.state.idUsuario);
                this.props.history.push('/');
            });
        }
    }


    cancel() {
        this.props.history.push('/');
    }

    render() {

        return (
            <div>
                <br></br>
                <Grid container container
                      direction="row"
                      justifyContent="center"
                      alignItems="center">
                    <Grid item xs={10}>
                        <h1 className="text-center">Pesquisa - Ciência Aberta</h1>
                        <p style={{fontSize: "medium", color: "red"}}>{this.state.error}</p>
                        <h3> {this.state.categoriaAtual}</h3>
                        <div>
                            <form>


                                {this.state.perguntasCategoria.map(perguntas =>
                                    <>
                                        {perguntas.descricaoPergunta}
                                        <br></br> <br></br>

                                        {perguntas.perguntaTipoPergunta == "TRUE_FALSE" ? //-------------------- TRUE_FALSE ---------------------------
                                            <>
                                                <div>
                                                    <input type="radio"
                                                           value="true"
                                                           checked={(this.state?.respostas.filter(res => res.idPergunta == perguntas.id).map(sel => (sel.resposta)).toString()) == 'true' ?
                                                               "true"
                                                               : null}
                                                           name={perguntas.perguntaTipoPergunta + perguntas.id}
                                                           onChange={(e) => this.onChangeTrueFalse(e, perguntas.id, perguntas.categoria.id)}/> Verdadeiro
                                                    <br></br>
                                                    <input type="radio"
                                                           value="false"
                                                           checked={(this.state?.respostas.filter(res => res.idPergunta == perguntas.id).map(sel => (sel.resposta)).toString()) == 'false' ?
                                                               "true"
                                                               : null}
                                                           name={perguntas.perguntaTipoPergunta + perguntas.id}
                                                           onChange={(e) => this.onChangeTrueFalse(e, perguntas.id, perguntas.categoria.id)}/> Falso
                                                </div>
                                            </>
                                            : perguntas.perguntaTipoPergunta == "ABERTA" ? //-------------------ABERTA -----------------------

                                                <>
                                                     <textarea
                                                         className="form-control"
                                                         placeholder="Resposta"
                                                         id="resposta_aberta"
                                                         value={this.state.respostas.filter(res => res.idPergunta == perguntas.id).map(sel => (sel.resposta))}
                                                         name={perguntas.perguntaTipoPergunta + perguntas.id}
                                                         onChange={(e) => this.onChangeAberta(e, perguntas.id, perguntas.categoria.id)}
                                                     />
                                                </>
                                                : perguntas.perguntaTipoPergunta == "ALTERNATIVE" ? //-------------------ALTERNATIVE -----------------------

                                                    <>
                                                        <div>
                                                            {perguntas.respostasPossiveisPergunta
                                                                .sort((a,b) => {
                                                                    return b.id - a.id
                                                                })
                                                                .map( alternativas =>
                                                                <>
                                                                    <input
                                                                        type="radio"
                                                                        checked={this.state?.respostas.filter(res => ((res.idPergunta == perguntas.id) && (res.idAlternativa == alternativas.id)))[0]?.estado}
                                                                        value={alternativas.descricaoRespostasPossiveis}
                                                                        name={perguntas.perguntaTipoPergunta + perguntas.id}
                                                                        onChange={(e) => this.onChangeAlternative(e, perguntas.id, alternativas.id, perguntas.categoria.id)}
                                                                    />
                                                                    ({alternativas.id}) {alternativas.descricaoRespostasPossiveis}
                                                                    <br></br>
                                                                </>
                                                            )}
                                                        </div>

                                                    </>
                                                    : //------------------- SELECAO -----------------------
                                                    <>
                                                        <div>
                                                            {perguntas.respostasPossiveisPergunta.map(alternativas =>
                                                                <>
                                                                    <input
                                                                        type="checkbox"
                                                                        checked={this.state?.respostas.filter(res => ((res.idPergunta == perguntas.id) && (res.idAlternativa == alternativas.id)))[0]?.estado}
                                                                        value={alternativas.descricaoRespostasPossiveis}
                                                                        name={perguntas.perguntaTipoPergunta + alternativas.id}
                                                                        onChange={(e) => this.onChangeSelecao(e, perguntas.id, alternativas.id, perguntas.categoria.id)}
                                                                    />
                                                                    {alternativas.descricaoRespostasPossiveis}
                                                                    <br></br>
                                                                </>
                                                            )}
                                                        </div>
                                                    </>
                                        }
                                        <>
                                        </>
                                        <hr></hr>
                                    </>
                                )}

                                {this.state.stepAtual != 0 ?
                                    <button className="btn btn-danger float-start"
                                            onClick={(e) => this.anteriorStep(e, this.state.stepAtual - 1)}> Anterior</button>
                                    : null
                                }

                                {this.state.stepAtual < this.state.quantidadeSteps ?

                                    <button className="btn btn-danger float-end"
                                            onClick={(e) => this.proximoStep(e, this.state.stepAtual + 1)}> Próximo</button>

                                    :
                                    <button className="btn btn-info float-end"
                                            onClick={this.salvaPesquisa}> Salvar</button>
                                }

                                <br></br><br></br><br></br>
                                <button className="btn btn-danger" onClick={this.cancel.bind(this)}
                                        style={{marginLeft: "40%"}}>Cancelar
                                </button>
                            </form>
                        </div>
                    </Grid>

                </Grid>
            </div>
        )
    }
}

export default AnswerSearchComponent