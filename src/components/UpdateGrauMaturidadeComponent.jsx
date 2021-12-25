import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";

class UpdateGrauMaturidadeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id: this.props.match.params.id,
            nivelGrauMaturidade:'',
            descricaoGrauMaturidade: '',
            pontuacaoMinimaGrauMaturidade: '',
            pontuacaoMaximaGrauMaturidade: '',
            porcentagemGrauMaturidade: ''
        }
        this.handleNivelGrauMaturidadeChange = this.handleNivelGrauMaturidadeChange.bind(this);
        this.handleDescricaoGrauMaturidadeChange = this.handleDescricaoGrauMaturidadeChange.bind(this);
        this.handlePontuacaoMinimaGrauMaturidadeChange = this.handlePontuacaoMinimaGrauMaturidadeChange.bind(this);
        this.handlePontuacaoMaximaGrauMaturidadeChange = this.handlePontuacaoMaximaGrauMaturidadeChange.bind(this);
        this.handlePorcentagemGrauMaturidadeChange = this.handlePorcentagemGrauMaturidadeChange.bind(this);

    }

    componentDidMount(){
        CienciaAbertaService.buscaGrauMaturidade(this.state.id).then( (res) =>{
            let grauMaturidade = res.data;
            this.setState({
                nivelGrauMaturidade: grauMaturidade.nivelGrauMaturidade,
                descricaoGrauMaturidade: grauMaturidade.descricaoGrauMaturidade,
                pontuacaoMinimaGrauMaturidade: grauMaturidade.pontuacaoMinimaGrauMaturidade,
                pontuacaoMaximaGrauMaturidade: grauMaturidade.pontuacaoMaximaGrauMaturidade,
                porcentagemGrauMaturidade: grauMaturidade.porcentagemGrauMaturidade
            });
        });

    }

    handleNivelGrauMaturidadeChange = (event) => {
        this.setState ({nivelGrauMaturidade: event.target.value});
    }

    handleDescricaoGrauMaturidadeChange = (event) => {
        this.setState ({descricaoGrauMaturidade: event.target.value});
    }

    handlePontuacaoMinimaGrauMaturidadeChange = (event) => {
        this.setState ({pontuacaoMinimaGrauMaturidade: event.target.value});
    }

    handlePontuacaoMaximaGrauMaturidadeChange = (event) => {
        this.setState ({pontuacaoMaximaGrauMaturidade: event.target.value});
    }

    handlePorcentagemGrauMaturidadeChange = (event) => {
        this.setState ({porcentagemGrauMaturidade: event.target.value});
    }

    saveGrauMaturidade = (e) => {
        e.preventDefault();
        let grauMaturidade = {
            nivelGrauMaturidade: this.state.nivelGrauMaturidade,
            descricaoGrauMaturidade: this.state.descricaoGrauMaturidade,
            pontuacaoMinimaGrauMaturidade: this.state.pontuacaoMinimaGrauMaturidade,
            pontuacaoMaximaGrauMaturidade: this.state.pontuacaoMaximaGrauMaturidade,
            porcentagemGrauMaturidade: this.state.porcentagemGrauMaturidade
        };
        console.log('grauMaturidade => ' + JSON.stringify(grauMaturidade));

        CienciaAbertaService.updateGrauMaturidade(this.state.id,grauMaturidade).then(res =>{
            this.props.history.push('/grau_maturidade_list');
        });
    }
    cancel(){
        this.props.history.push('/grau_maturidade_list');
    }
    render() {
        return (
            <div>
                <br></br>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Alterar Grau Maturidade</h3>

                            <div className = "card-body">
                                <form>
                                        <div className = "form-group">
                                            <label> Nível: </label>
                                            <input placeholder="Nível" id="nivelGrauMaturidade" name="nivelGrauMaturidade" className="form-control"
                                                   value = {this.state.nivelGrauMaturidade} onChange = {this.handleNivelGrauMaturidadeChange}  />
                                            <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <label> Descrição: </label>
                                            <textarea placeholder="Descrição" id="descricaoGrauMaturidade" name="descricaoGrauMaturidade" className="form-control"
                                                      value = {this.state.descricaoGrauMaturidade} onChange = {this.handleDescricaoGrauMaturidadeChange}  />
                                            <br></br>
                                        </div>

                                        <div className = "form-group" >
                                            <div className="row">
                                                <div className="col-6">
                                                    <label> Pontuação Mínima: </label>
                                                    <input placeholder="Pontuação Mínima" id="pontuacaoMinimaGrauMaturidade" name="pontuacaoMinimaGrauMaturidade" className="form-control"
                                                           value = {this.state.pontuacaoMinimaGrauMaturidade} onChange = {this.handlePontuacaoMinimaGrauMaturidadeChange}  />
                                                </div>
                                                <div className="col-6">
                                                    <label> Pontuação Máxima: </label>
                                                    <input placeholder="Pontuação Máxima" id="pontuacaoMaximaGrauMaturidade" name="pontuacaoMaximaGrauMaturidade" className="form-control"
                                                           value = {this.state.pontuacaoMaximaGrauMaturidade} onChange = {this.handlePontuacaoMaximaGrauMaturidadeChange}  />
                                                </div>
                                            </div>
                                            <br></br>
                                        </div>

                                        <div className = "form-group">
                                            <label> Porcentagem (%): </label>
                                            <input placeholder="Porcentagem" id="porcentagemGrauMaturidade" name="porcentagemGrauMaturidade" className="form-control"
                                                   value = {this.state.porcentagemGrauMaturidade} onChange = {this.handlePorcentagemGrauMaturidadeChange}  />
                                            <br></br>
                                        </div>




                                        <button className="btn btn-success" onClick={this.saveGrauMaturidade}>Salvar</button>
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

export default UpdateGrauMaturidadeComponent;