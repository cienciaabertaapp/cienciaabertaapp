import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";

class CreateGrauMaturidadeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    handleNivelGrauMaturidadeChange = (event) => {
        this.setState ({nivelGrauMaturidade: event.target.value});
    }
    handleDescicaoGrauMaturidadeChange = (event) => {
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
        CienciaAbertaService.createGrauMaturidade(grauMaturidade).then(res =>{
            this.props.history.push('/grau_maturidade_list');
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
                        <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Criar Grau Maturidade</h3>

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
                                               value = {this.state.descricaoGrauMaturidade} onChange = {this.handleDescicaoGrauMaturidadeChange}  />
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

export default CreateGrauMaturidadeComponent