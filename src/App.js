import {React, useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateUsuarioComponent from './components/CreateUsuarioComponent';
import CreateCategoriaComponent from './components/CreateCategoriaComponent';
import LoginUsuarioComponent from './components/LoginUsuarioComponent';
import AnswerSearchComponent from "./components/AnswerSearchComponent";
import ListUserComponent from "./components/ListUserComponent";
import ListCategoriaComponent from "./components/ListCategoriaComponent";
import UpdateUsuarioComponent from "./components/UpdateUsuarioComponent";
import ViewUsuarioComponent from "./components/ViewUsuarioComponent";
import UpdateCategoriaComponent from "./components/UpdateCategoriaComponent";
import ListPerguntasComponent from "./components/ListPerguntasComponent";
import NotFound from "./components/NotFound";
import {history} from "./history";
import { isAuthenticated } from "./auth";
import CreatePerguntaComponent from "./components/CreatePerguntaComponent";
import ViewPerguntaComponent from "./components/ViewPerguntaComponent";
import UpdatePerguntaComponent from "./components/UpdatePerguntaComponent";
import CreateGrauMaturidadeComponent from "./components/CreateGrauMaturidadeComponent";
import UpdateGrauMaturidadeComponent from "./components/UpdateGrauMaturidadeComponent";
import ListGrauMaturidadeComponent from "./components/ListGrauMaturidadeComponent";
import Lateral from "./components/Lateral";
import {Grid} from "@mui/material";
import MenuAdminComponent from "./components/MenuAdminComponent";
import MenuComponent from "./components/MenuComponent";import axios from "axios";
import { getToken } from "./auth";
import MyAdmin from "./contexts/MyAdmin";
import RulesAdmin from "./contexts/MyAdmin";


const api = axios.create({
    baseURL: "http://127.0.0.1:3333"
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props =>
        isAuthenticated() ? (
            <Component {...props} />
        ) : (
            // eslint-disable-next-line react/jsx-no-undef
            <Redirect to={{ pathname: "/user_login", state: { from: props.location } }} />
        )
    }
    />
);

function App() {
    return (
        <div>
            <Router history={history}>
                <Grid container>
                    <Grid item xs={12}>
                        <HeaderComponent />
                    </Grid>
                </Grid>


                <Grid container>
                    {  isAuthenticated() ?
                        <Grid item xs={2}>
                            <MenuAdminComponent/>
                        </Grid>
                        : <Grid item xs={2}>
                            <MenuComponent/>
                        </Grid>
                    }
                    <Grid item xs={10}>
                        <Switch>
                            <Route  exact path = "/" component = {DefaultComponent}></Route>
                            <Route path = "/user_login" component = {LoginUsuarioComponent}></Route>
                            <Route path = "/usuario" component = {CreateUsuarioComponent}></Route>
                            <Route path = "/usuario_edit/:id" component = {UpdateUsuarioComponent}></Route>
                            <PrivateRoute path = "/usuario_view/:id" component = {ViewUsuarioComponent}></PrivateRoute>
                            <PrivateRoute path = "/usuario_list" component = {ListUserComponent}></PrivateRoute>
                            <PrivateRoute path = "/categoria" component = {CreateCategoriaComponent}></PrivateRoute>
                            <PrivateRoute path = "/categoria_edit/:id" component = {UpdateCategoriaComponent}></PrivateRoute>
                            <PrivateRoute path = "/categoria_list" component = {ListCategoriaComponent}></PrivateRoute>
                            <Route path = "/pesquisa/:id" component = {AnswerSearchComponent}></Route>
                            <PrivateRoute path = "/perguntas" component = {CreatePerguntaComponent}></PrivateRoute>
                            <PrivateRoute path = "/perguntas_list" component = {ListPerguntasComponent}></PrivateRoute>
                            <PrivateRoute path = "/pergunta_view/:id" component = {ViewPerguntaComponent}></PrivateRoute>
                            <PrivateRoute path = "/pergunta_edit/:id" component = {UpdatePerguntaComponent}></PrivateRoute>
                            <PrivateRoute path = "/grau_maturidade" component = {CreateGrauMaturidadeComponent}></PrivateRoute>
                            <PrivateRoute path = "/grau_maturidade_edit/:id" component = {UpdateGrauMaturidadeComponent}></PrivateRoute>
                            <PrivateRoute path = "/grau_maturidade_list" component = {ListGrauMaturidadeComponent}></PrivateRoute>
                            <Route component={NotFound}></Route>
                            {/* <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                          <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                        </Switch>
                    </Grid>
                </Grid>
                <Grid container>
                    <Grid item xs={12}>
                        <FooterComponent />
                    </Grid>
                </Grid>
            </Router>
        </div>

    );
}

export default App;