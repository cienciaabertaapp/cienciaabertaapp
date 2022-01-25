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
import {getToken, isAuthenticated, logout, parseJwt, TOKEN_KEY} from "../auth";
import LoginUsuarioComponent from "./LoginUsuarioComponent";
import {config} from "react-transition-group";
import api from "../api";


class MenuAdminComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            mostraCategorias:false,
            mostraGlossario:false,
            mostraApresentacao:false,
            mostraReferencias:false,
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


    handleMostraGlossario = (e) =>{
        if (this.state.mostraGlossario){
            this.setState({mostraGlossario: false});
        }else{
            this.setState({mostraGlossario: true});
        }
    }

    handleMostraApresentacao = (e) =>{
        if (this.state.mostraApresentacao){
            this.setState({mostraApresentacao: false});
        }else{
            this.setState({mostraApresentacao: true});
        }
    }

    handleMostraReferencias = (e) =>{
        if (this.state.mostraReferencias){
            this.setState({mostraReferencias: false});
        }else{
            this.setState({mostraReferencias: true});
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





            <a onClick={this.handleMostraGlossario}>
                <div style={{marginLeft: "10px"}}> <BsFillJournalBookmarkFill /> Glossário
                    <label style={{marginLeft: "43%"}}>
                        { this.state.mostraGlossario ? <BsCaretUp/>:  <BsCaretDown/>}
                    </label></div> </a>
            { this.state.mostraGlossario ?
                <>
                    <br></br>
                    <Link to='/glossario/' style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Cadastrar Glossário  </div> </Link>
                    <br></br>
                    <Link to="/glossario_list/" style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Visualizar Glossário  </div></Link>
                </>
                : null
            }

            <hr></hr>

            <a onClick={this.handleMostraApresentacao}>
                <div style={{marginLeft: "10px"}}> <BsFillJournalBookmarkFill /> Apresentação
                    <label style={{marginLeft: "28%"}}>
                        { this.state.mostraApresentacao ? <BsCaretUp/>:  <BsCaretDown/>}
                    </label></div> </a>
            { this.state.mostraApresentacao ?
                <>
                    <br></br>
                    <Link to='/apresentacao/' style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Cadastrar Apresentação </div> </Link>
                    <br></br>
                    <Link to="/apresentacao_list/" style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Visualizar Apresentação  </div></Link>
                </>
                : null
            }

            <hr></hr>


            <a onClick={this.handleMostraReferencias}>
                <div style={{marginLeft: "10px"}}> <BsFillJournalBookmarkFill /> Referências
                    <label style={{marginLeft: "35%"}}>
                        { this.state.mostraReferencias ? <BsCaretUp/>:  <BsCaretDown/>}
                    </label></div> </a>
            { this.state.mostraReferencias ?
                <>
                    <br></br>
                    <Link to='/referencias/' style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Cadastrar Referências </div> </Link>
                    <br></br>
                    <Link to="/referencias_list/" style={{ textDecoration: 'none', color:'black' }}> <div style={{marginLeft: "30px", fontSize:"smaller"}}>  <BsFillCaretRightFill /> Visualizar Referências  </div></Link>
                </>
                : null
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