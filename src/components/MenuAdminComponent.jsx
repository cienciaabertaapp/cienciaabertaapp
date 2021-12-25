import React, { Component } from 'react'
import {NavLink, Link, useHistory, Redirect} from 'react-router-dom';
import CreateCategoriaComponent from "./CreateCategoriaComponent";
import { FaTrashAlt,FaRegSave,FaBackspace } from 'react-icons/fa';
import {BsFillJournalBookmarkFill,BsFillChatRightTextFill,BsFillFilePersonFill,BsFillAwardFill,BsJournalBookmark,BsFillCaretRightFill,BsCaretDown,BsCaretUp} from 'react-icons/bs'
import ListCategoriaComponent from "./ListCategoriaComponent";
import CreatePerguntaComponent from "./CreatePerguntaComponent";
import ListPerguntasComponent from "./ListPerguntasComponent";
import CreateGrauMaturidadeComponent from "./CreateGrauMaturidadeComponent";
import ListGrauMaturidadeComponent from "./ListGrauMaturidadeComponent";
import CreateUsuarioComponent from "./CreateUsuarioComponent";
import ListUserComponent from "./ListUserComponent";
import UpdateCategoriaComponent from "./UpdateCategoriaComponent";
import DefaultComponent from "./DefaultComponent";
import {logout} from "../auth";
import LoginUsuarioComponent from "./LoginUsuarioComponent";

class MenuAdminComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mostraCategorias:false,
            mostraPerguntas:false,
            mostraGrauMaturidade:false,
            mostraUsuarios:false
        }
    }

    handleMostraCategoria = (e) =>{
        if (this.state.mostraCategorias){
            this.setState({mostraCategorias: false});
        }else{
            this.setState({mostraCategorias: true});
        }
    }

    handlemostraPerguntas = (e) =>{
        if (this.state.mostraPerguntas){
            this.setState({mostraPerguntas: false});
        }else{
            this.setState({mostraPerguntas: true});
        }
    }

    handlemostraGrauMaturidade = (e) =>{
        if (this.state.mostraGrauMaturidade){
            this.setState({mostraGrauMaturidade: false});
        }else{
            this.setState({mostraGrauMaturidade: true});
        }
    }

    handlemostraUsuarios = (e) =>{
        if (this.state.mostraUsuarios){
            this.setState({mostraUsuarios: false});
        }else{
            this.setState({mostraUsuarios: true});
        }
    }

    render() {
        return (
        <div>

                    <div className="text-center" style={{fontSize:"x-large"}}>
                        Administrador
                    </div>
                    <br></br>
                    <a onClick={this.handleMostraCategoria}>
                        <div style={{marginLeft: "10px"}}> <BsFillJournalBookmarkFill /> Categorias
                            <label style={{marginLeft: "40%"}}>
                                { this.state.mostraCategorias ? <BsCaretUp/>:  <BsCaretDown/>}
                            </label></div> </a>
                    { this.state.mostraCategorias ?
                        <>
                            <br></br>
                            <Link to='/categoria/' style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Cadastrar Categoria  </div> </Link>
                            <br></br>
                           <Link to="/categoria_list/" style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Visualizar Categorias  </div></Link>
                        </>
                        : null
                    }

                    <hr></hr>
                    <a onClick={this.handlemostraPerguntas}>
                        <div style={{marginLeft: "10px"}}> <BsFillChatRightTextFill/> Perguntas
                            <label style={{marginLeft: "42%"}}>
                                { this.state.mostraPerguntas ? <BsCaretUp/> :<BsCaretDown/>}
                            </label></div></a>
                    { this.state.mostraPerguntas ?
                        <>
                            <br></br>
                            <Link to='/perguntas/' style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Cadastrar Pergunta  </div></Link>
                            <br></br>
                            <Link to='/perguntas_list/' style={{ textDecoration: 'none', color:'black' }}>  <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Visualizar Perguntas  </div></Link>
                        </>
                        :null
                    }

                    <hr></hr>
                    <a onClick={this.handlemostraGrauMaturidade}>
                        <div style={{marginLeft: "10px"}}> <BsFillAwardFill/> Grau Maturidade
                            <label style={{marginLeft: "19%"}}>
                                { this.state.mostraGrauMaturidade ? <BsCaretUp/>:  <BsCaretDown/>}
                            </label></div></a>
                    { this.state.mostraGrauMaturidade ?
                        <>
                            <br></br>
                            <Link to='/grau_maturidade/' style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Cadastrar Grau Maturidade  </div></Link>
                            <br></br>
                            <Link to='/grau_maturidade_list/' style={{ textDecoration: 'none', color:'black' }}>   <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Visualizar Grau Maturidade  </div></Link>
                        </>
                        :null
                    }
                    <hr></hr>
                    <a onClick={this.handlemostraUsuarios}>
                        <div style={{marginLeft: "10px"}}> <BsFillFilePersonFill/> Usuários
                            <label style={{marginLeft: "47%"}}>
                                { this.state.mostraUsuarios ? <BsCaretUp/>:  <BsCaretDown/>}
                            </label></div></a>
                    { this.state.mostraUsuarios ?
                        <>
                            <br></br>
                            <Link to='/usuario/' style={{ textDecoration: 'none', color:'black' }}>  <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Cadastrar Usuário  </div></Link>
                            <br></br>
                            <Link to='/usuario_list/' style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Visualizar Usuários  </div></Link>
                        </>
                        :null
                    }
                    <hr></hr>


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
export default MenuAdminComponent