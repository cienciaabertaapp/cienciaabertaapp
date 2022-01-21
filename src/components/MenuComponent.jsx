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
import {Button, Grid} from "@mui/material";

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
                <Grid
                    xs={10}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="stretch"
                    rowSpacing={3}
                >
                    <Grid item xs={8}>  <Button variant="outlined" fullWidth> <Link to='/' style={{ textDecoration: 'none', color:'black' }}> Início </Link> </Button></Grid>

                    <Grid item xs={8}>  <Button variant="outlined" fullWidth> <Link to='/apresentacao_inicial' style={{ textDecoration: 'none', color:'black' }}> Apresentação </Link></Button> </Grid>

                    <Grid item xs={8}>  <Button variant="outlined" fullWidth> <Link to='/usuario' style={{ textDecoration: 'none', color:'black' }}> Cadastrar </Link></Button> </Grid>
                    <Grid item xs={8}>  <Button variant="outlined" fullWidth> <Link to='/user_login' style={{ textDecoration: 'none', color:'black' }}> Login </Link></Button> </Grid>


                    <Grid item xs={8}>  <Button variant="outlined" fullWidth> <Link to='/glossario_inicial' style={{ textDecoration: 'none', color:'black' }}> Glossário </Link></Button> </Grid>

                    <Grid item xs={8}>  <Button variant="outlined" fullWidth> <Link to='/referencias_inicial' style={{ textDecoration: 'none', color:'black' }}> Referências </Link></Button> </Grid>

                </Grid>

                </div>

        )
    }
}
export default MenuComponent