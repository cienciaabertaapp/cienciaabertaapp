import React, { Component } from 'react';
import CienciaAbertaService from '../services/CienciaAbertaService';
import { FaTrashAlt,FaRegSave,FaBackspace } from 'react-icons/fa';
import { BiAddToQueue } from "react-icons/bi";
import {IconButton} from "@mui/material";


class CreatePerguntaComponent extends Component {

    state = {
        alternativas:[],
        categorias: [],
        categoria: [],
        mostraBotaoAlternativas: false,
        mostraBotaoApagarAlternativa:false
    }

    constructor(props) {
        super(props)
    }

    componentDidMount(){
        CienciaAbertaService.listCategoria().then((res) => {
            this.setState({ categorias: res.data});
        });
    }
    addAlternativa = (event) =>{
        event.preventDefault();
        this.setState({alternativas:[...this.state.alternativas,"" ]});

    }

    handleRemoveInputAlternativa = (e,position) => {
        e.preventDefault();
        this.setState({alternativas:[...this.state.alternativas.filter((_,index) => index != position)] });
        //console.log(this.state.alternativas);

    }

    handleChangeAlternativa = (e, index) => {
        this.state.alternativas[index] = e.target.value;
        this.setState([...this.state.alternativas]);

    }

    handleChangeTipoPergunta= (event) =>{
        console.log(event.target.value);
        this.setState ({tipoPergunta: event.target.value});
        if ((event.target.value == "TRUE_FALSE") || (event.target.value == "ABERTA")){
            this.setState({mostraBotaoAlternativas: false});
        }else{
            this.setState({mostraBotaoAlternativas: true});
        }
     }

    handleChangeCategoriaPergunta = (event) => {
        this.setState ({categoria: this.state.categorias.find(c => c.id == event.target.value)});
    }

    handleChangePerguntaDescricao = (event) => {
        this.setState ({perguntaDescricao: event.target.value});
    }

    savePergunta = (e) => {
        e.preventDefault();
        let array_alternativas = this.state.alternativas.map((alternativa,index) => (
            {"id":index,"descricaoRespostasPossiveis":alternativa}
         ));
        let pergunta = {
            descricaoPergunta: this.state.perguntaDescricao,
            categoria: this.state.categoria,
            perguntaTipoPergunta: this.state.tipoPergunta,
            respostasPossiveisPergunta: array_alternativas

        };
        console.log('pergunta => ' + JSON.stringify(pergunta));

        CienciaAbertaService.createPergunta(pergunta).then(res =>{
            this.props.history.push('/perguntas_list');
        });
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
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Adicionar Pergunta</h3>

                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Descrição pergunta: </label>
                                            <textarea
                                                className="form-control"
                                                placeholder="Descrição pergunta"
                                                id="perguntaDescricao"
                                                name="perguntaDescricao"
                                                onChange={this.handleChangePerguntaDescricao}
                                                value ={this.state.perguntaDescricao}
                                            />
                                        </div>

                                        <br></br>
                                        <div className = "form-group" >
                                            <label> Categoria Pergunta: </label>
                                            <select className="form-select" onChange={this.handleChangeCategoriaPergunta}  >

                                                <option value="0" >Selecione a categoria da pergunta</option>
                                                {
                                                    this.state.categorias.map( categoria =>
                                                            <option key={categoria.id} value={categoria.id} > {categoria.descricaoCategoriaPergunta} </option>
                                                    )
                                                }
                                            </select>
                                        </div>


                                        <br></br>
                                        <div className = "form-group" >
                                            <label> Tipo de pergunta: </label>
                                            <select className="form-select"  onChange={this.handleChangeTipoPergunta}  >
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
                                        {this.state.alternativas.map((alternativa,index) => (
                                            <>
                                                <label > Alternativa {index}</label>
                                                <div style={{display:"flex"}}>
                                                    <input
                                                        placeholder= {"Alternativa " + index}
                                                        id={index}
                                                        name={"perguntaAlternativaDescricao" + alternativa}
                                                        className="form-control"
                                                        value={alternativa}
                                                        onChange={(e)=>this.handleChangeAlternativa(e,index)}
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
<br></br>
                                        <button className="btn btn-success" onClick={this.savePergunta}> <FaRegSave/> Salvar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}><FaBackspace/> Cancelar</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }


}

export default CreatePerguntaComponent