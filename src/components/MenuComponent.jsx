import React, { Component } from 'react'
import {NavLink, Link} from 'react-router-dom';
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
import {Button} from "@mui/material";

class MenuComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <Button variant="outlined" fullWidth="100%"><Link to='/' style={{ textDecoration: 'none', color:'black' }}> Início </Link></Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                 <Button variant="outlined" fullWidth="100%"><Link to='/usuario' style={{ textDecoration: 'none', color:'black' }}> Cadastrar </Link></Button>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <Button variant="outlined" fullWidth="100%"><Link to='/user_login' style={{ textDecoration: 'none', color:'black' }}> Login </Link></Button>
                </div>

        )
    }
}
export default MenuComponent