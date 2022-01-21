import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import { useForm } from "react-hook-form";
import {Grid, styled} from "@mui/material";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {BrowserRouter as Router, Link} from "react-router-dom";
import {getUsuario} from "../dadosGlobais";

class AnswerSearchComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            respostas:[]
        }
    }
    componentDidMount(){
        CienciaAbertaService.listRespostas().then((res) => {
            this.setState({ respostas: res.data});
        });
    }
    cancel(){
        this.props.history.push('/');
    }

    render() {
        const Item = styled(Paper)(({ theme }) => ({
            ...theme.typography.body2,
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.primary,
        }));
        return (
            <div>
                <div className = "col-md-12 offset-md-0 offset-md-0">
                    <br></br>
                    <h2 className="text-center">Instituições Cadastradas</h2>
                    <br></br>

                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <Item> <b>INSTITUIÇÃO</b> </Item>
                        </Grid>
                        <Grid item xs={3}>
                            <Item> <b>NÍVEL MATURIDADE</b></Item>
                        </Grid>
                        <Grid item xs>
                            <Item><b>PONTUAÇÃO</b></Item>
                        </Grid>
                    </Grid>
                    <br></br><br></br>
                    <Grid container>
                        <Grid item xs={12}>
                            { this.state.respostas.map(resp => (
                                resp.divulgaUsuario ?
                                    <>
                                        <Grid container spacing={3}>
                                            <Grid item xs={6}>
                                                <Item>  <Link to={'/pesquisa_usuario/'+resp.idUsuario} style={{ textDecoration: 'none', color:'black' }}> {resp.instituicaoUsuario}</Link></Item>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Item>{resp.grauMaturidadeUsuario.nivelGrauMaturidade}</Item>
                                            </Grid>
                                            <Grid item xs>
                                                <Item> {resp.pontuacaoUsuario}</Item>
                                            </Grid>
                                        </Grid>


                                        <hr></hr>
                                    </>
                                    : null
                            ))
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>



        )
    }
}

export default AnswerSearchComponent