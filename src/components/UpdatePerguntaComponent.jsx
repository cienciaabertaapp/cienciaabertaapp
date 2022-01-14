import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import {BiAddToQueue} from "react-icons/bi";
import {FaTrashAlt} from "react-icons/fa";

class UpdatePerguntaComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            descricaoPergunta: '',
            perguntaTipoPergunta: '',
            respostasPossiveisPergunta: [],
            categorias:[],
            categoria:[],
            alternativas:[],
            mostraBotaoAlternativas: false,
            mostraBotaoApagarAlternativa:false
        }
        this.handledescricaoPerguntaChange = this.handledescricaoPerguntaChange.bind(this);
        this.handledescricaoCategoriaPerguntaChange = this.handledescricaoCategoriaPerguntaChange.bind(this);
        this.handleperguntaTipoPerguntaChange = this.handleperguntaTipoPerguntaChange.bind(this);
        this.handlerrespostasPossiveisPerguntaChange = this.handlerrespostasPossiveisPerguntaChange.bind(this);

    }

    componentDidMount(){

        CienciaAbertaService.listCategoria().then((res) => {
            this.setState({ categorias: res.data});
        });

        CienciaAbertaService.buscaPergunta(this.state.id).then((res) => {
            let pergunta = res.data;
            this.setState({
                descricaoPergunta: pergunta.descricaoPergunta,
                categoria: pergunta.categoria,
                perguntaTipoPergunta: pergunta.perguntaTipoPergunta,
                respostasPossiveisPergunta: pergunta.respostasPossiveisPergunta
            });
            if (this.state.perguntaTipoPergunta == "TRUE_FALSE") {
                this.setState({tipoPergunta: "True ou False"});
                this.setState({mostraAlternativas: false});
                this.setState({tipoAlternativa: false});
                this.setState({mostraBotaoAlternativas: false});
            } else if (this.state.perguntaTipoPergunta == "ALTERNATIVE") {
                this.setState({tipoPergunta: "Alternativas"});
                this.setState({mostraAlternativas: true});
                this.setState({tipoAlternativa: true});
                this.setState({mostraBotaoAlternativas: true});
            }else if (this.state.perguntaTipoPergunta == "SELECAO") {
                this.setState({tipoPergunta: "Seleção"});
                this.setState({mostraAlternativas: true});
                this.setState({tipoAlternativa: false});
                this.setState({mostraBotaoAlternativas: true});
            }else if (this.state.perguntaTipoPergunta == "ABERTA") {
                this.setState({tipoPergunta: "Aberta"});
                this.setState({mostraAlternativas: false});
                this.setState({tipoAlternativa: false});
                this.setState({mostraBotaoAlternativas: false});
            }
        });

    }



    handledescricaoPerguntaChange = (event) => {
        this.setState ({descricaoPergunta: event.target.value});
    }


    handledescricaoCategoriaPerguntaChange = (event) => {
       // event.preventDefault();
        console.log(event.target.value);
        if (event.target.value == ""){
            this.setState ({categoria: ""});
        }else {
            this.setState ({categoria: this.state.categorias.find(c => c.id == event.target.value)});
        }
        console.log(this.state.categoria);


    }

    handleperguntaTipoPerguntaChange = (event) => {
        this.setState ({perguntaTipoPergunta: event.target.value});
        if ((event.target.value == "TRUE_FALSE") || (event.target.value == "ABERTA")|| (event.target.value == "")){
            this.setState({mostraBotaoAlternativas: false});
            this.setState({respostasPossiveisPergunta:[] });
        }else{
            this.setState({mostraBotaoAlternativas: true});
        }


    }
    handlerrespostasPossiveisPerguntaChange = (event, index) => {
        // this.state.respostasPossiveisPergunta = event.target.value;

        //   this.state.respostasPossiveisPergunta[index] = event.target.value;
        this.state.respostasPossiveisPergunta[index] = {"id":index,"descricaoRespostasPossiveis":event.target.value};

        this.setState([...this.state.respostasPossiveisPergunta]);
        //this.setState ({respostasPossiveisPergunta: event.target.value});
    }

    addAlternativa = (event) =>{
        event.preventDefault();
        this.setState({respostasPossiveisPergunta:[...this.state.respostasPossiveisPergunta,"" ]});

    }

    handleRemoveInputAlternativa = (e,position) => {
        e.preventDefault();
        this.setState({respostasPossiveisPergunta:[...this.state.respostasPossiveisPergunta.filter((_,index) => index != position)] });
        //console.log(this.state.alternativas);

    }

    savePergunta = (e) => {
        e.preventDefault();
        console.log(this.state.perguntaTipoPergunta);

        if ((this.state.descricaoPergunta == "") || (this.state.categoria=="")|| (this.state.perguntaTipoPergunta == "")){
            this.setState({error:"Preencha todos os campos"});
        }else {
            if (((this.state.perguntaTipoPergunta == "ALTERNATIVE") || (this.state.perguntaTipoPergunta == "SELECAO")) && (this.state.respostasPossiveisPergunta == "")) {

                this.setState({error:"O tipo de pergunta exige pelo menos uma alternativa"});
            } else {
                let pergunta = {
                    descricaoPergunta: this.state.descricaoPergunta,
                    categoria: this.state.categoria,
                    perguntaTipoPergunta: this.state.perguntaTipoPergunta,
                    respostasPossiveisPergunta: this.state.respostasPossiveisPergunta

                };
                console.log('pergunta => ' + JSON.stringify(pergunta));

                CienciaAbertaService.updatePergunta(this.state.id,pergunta).then(res =>{
                    this.props.history.push('/perguntas_list');
                });
            }
        }
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
                        <div className = "card col-md-10 offset-md-1 offset-md-1"> <h3 className="text-center">Alterar Pergunta</h3>
                            <p style={{fontSize: "medium", color:"red"}}>{this.state.error}</p>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Descrição: </label>
                                        <input placeholder="Descrição" id="descricaoPergunta" name="descricaoPergunta" className="form-control"
                                               value = {this.state.descricaoPergunta} onChange = {this.handledescricaoPerguntaChange}  />
                                    </div>

                                    <br></br>

                                    <div className = "form-group" >
                                        <label> Categoria Pergunta: </label>
                                        <select className="form-select" onChange={this.handledescricaoCategoriaPerguntaChange} value={this.state.categoria.id}>

                                            <option key="0" value= "" >Selecione a categoria da pergunta</option>
                                            {
                                                this.state.categorias.map( categoria =>
                                                    <option key={categoria.id} value={categoria.id} >
                                                        {categoria.descricaoCategoriaPergunta}
                                                    </option>
                                                )
                                            }
                                        </select>
                                    </div>




                                    <br></br>
                                    <div className = "form-group" >
                                        <label> Tipo de pergunta: </label>
                                        <select className="form-select"  onChange={this.handleperguntaTipoPerguntaChange} value={this.state.perguntaTipoPergunta}
                                        >
                                            <option value = "" >Selecione o tipo da pergunta</option>
                                            <option value = "TRUE_FALSE"  >Verdadeiro ou Falso</option>
                                            <option value = "ALTERNATIVE" >Alternativa (seleção de apenas 1 resposta)</option>
                                            <option value = "ABERTA" >Aberta</option>
                                            <option value = "SELECAO" >Seleção (seleção de 1 ou mais alternativas)</option>
                                        </select>
                                    </div>
                                    <br></br>


                                    { this.state.mostraBotaoAlternativas ?
                                        <>
                                            <button className="btn btn-info" onClick={this.addAlternativa}> <BiAddToQueue/> Adicionar
                                                Alternativa</button>
                                            <br></br>  <br></br>
                                        </>
                                        : null
                                    }
                                    {this.state.respostasPossiveisPergunta.map((alternativa,index) => (
                                        <>
                                            <label > Alternativa {index}</label>
                                            <div style={{display:"flex"}}>
                                                <input
                                                    placeholder= {"Alternativa " + index}
                                                    id={index}
                                                    name={"perguntaAlternativaDescricao" + alternativa}
                                                    className="form-control"
                                                    value={alternativa.descricaoRespostasPossiveis}
                                                    onChange={(e)=>this.handlerrespostasPossiveisPerguntaChange(e,index)}
                                                />

                                                <button className="btn btn-dark"
                                                        style={{marginLeft:4}}
                                                        onClick={(e)=> this.handleRemoveInputAlternativa(e,index)} >
                                                    <FaTrashAlt />

                                                </button>
                                            </div>
                                        </>

                                    ) )}

                                    <br></br>


                                    <button className="btn btn-success" onClick={this.savePergunta}>Salvar</button>
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

export default UpdatePerguntaComponent;