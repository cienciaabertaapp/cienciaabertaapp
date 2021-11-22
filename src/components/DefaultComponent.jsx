import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form"; 

class AnswerSearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }


    // step 3
    componentDidMount(){

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