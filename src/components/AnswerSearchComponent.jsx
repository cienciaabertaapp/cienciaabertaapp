import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form"; 

class AnswerSearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            perguntas: [],
            categorias: [],
            quantidadeSteps: 0
        }
    }


    // step 3
    componentDidMount(){
        CienciaAbertaService.listPerguntas().then((res) => {
            this.setState({ perguntas: res.data});
        });
        CienciaAbertaService.listCategoria().then((res) => {
            this.setState({ categorias: res.data});
            let quantidadeSteps = this.state.categorias.length;
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
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Pesquisa - Ciência Aberta</h3>
                                {
                                  //  this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>


                                        {    this.state.categorias.map( step =>
                                          <>
                                              teste
                                            {step.id} <br></br>
                                          </>
                                        )}


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

export default AnswerSearchComponent