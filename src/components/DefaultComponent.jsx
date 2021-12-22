import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form"; 

class AnswerSearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){

    }
    cancel(){
        this.props.history.push('/');
    }

    render() {

        return (
            <></>
        )
    }
}

export default AnswerSearchComponent