import React, { Component } from 'react'
import {BsFillChatRightTextFill,BsFillFilePersonFill} from 'react-icons/bs'
import { logout} from "../auth";
import {Link, useParams} from "react-router-dom";
import CienciaAbertaService from "../services/CienciaAbertaService";
import {recuperaId} from "../dadosGlobais";

class MenuUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <div className="text-center" style={{fontSize:"x-large"}}>
                    Usuário
                </div>

                <hr></hr>
                <Link to={'/usuario_edit/'+this.state.id} style={{ textDecoration: 'none', color:'black' }}>
                    <div style={{marginLeft: "10px"}}> <BsFillFilePersonFill/> Meu Cadastro</div></Link>
                <hr></hr>
                <a onClick=''> <div style={{marginLeft: "10px"}}>  <BsFillChatRightTextFill/>  Minha Pesquisa </div></a>


                <br></br><br></br>

                <div style={{marginLeft: "10px"}}>
                    <button
                        className="btn btn-dark bg-gradient"
                        onClick={() => logout()}>  SAIR
                    </button>
                </div>
            </div>

        )
    }
}
export default MenuUserComponent