import React, {Component, useContext} from 'react'
import {BsFillChatRightTextFill,BsFillFilePersonFill} from 'react-icons/bs'
import { logout} from "../auth";
import {Link, useParams} from "react-router-dom";
import CienciaAbertaService from "../services/CienciaAbertaService";
import {id} from "./UpdateUsuarioComponent";
import {getUsuario, ID_USUARIO} from "../dadosGlobais";


class MenuUserComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
           // id: this.props.match.params.id
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
                <Link to={'/usuario_edit/'+getUsuario()} style={{ textDecoration: 'none', color:'black' }}>
                    <div style={{marginLeft: "10px"}}> <BsFillFilePersonFill/> Meu Cadastro</div></Link>
                <hr></hr>
                <Link to={'/pesquisa_usuario/'+getUsuario()} style={{ textDecoration: 'none', color:'black' }}>
                    <div style={{marginLeft: "10px"}}> <BsFillChatRightTextFill/>  Minha Pesquisa</div></Link>


                <br></br><br></br>

                <div style={{marginLeft: "10px"}}>
                    <button
                        className="btn btn-dark bg-gradient"
                        onClick={() => logout()}>  INÍCIO
                    </button>
                    <button
                        style={{marginLeft: "40px"}}
                        className="btn btn-dark bg-gradient"
                        onClick={() => logout()}>  SAIR
                    </button>
                </div>
            </div>

        )
    }
}
export default MenuUserComponent