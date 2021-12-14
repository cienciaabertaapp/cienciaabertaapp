import {React, useState,useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
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
              <HeaderComponent />
                <div className="container">
                    <Switch>
                          <Route path = "/" exact component = {DefaultComponent}></Route>
                          <Route path = "/user_login" component = {LoginUsuarioComponent}></Route>
                          <Route path = "/usuario" component = {CreateUsuarioComponent}></Route>
                        <Route path = "/usuario_edit/:id" component = {UpdateUsuarioComponent}></Route>
                        <Route path = "/usuario_view/:id" component = {ViewUsuarioComponent}></Route>
                        <Route path = "/usuario_list" component = {ListUserComponent}></Route>
                        <Route path = "/categoria" component = {CreateCategoriaComponent}></Route>
                        <Route path = "/categoria_edit/:id" component = {UpdateCategoriaComponent}></Route>
                        <Route path = "/categoria_list" component = {ListCategoriaComponent}></Route>
                        <Route path = "/pesquisa" component = {AnswerSearchComponent}></Route>
                        <Route path = "/perguntas" component = {CreatePerguntaComponent}></Route>
                        <Route path = "/perguntas_list" component = {ListPerguntasComponent}></Route>
                        <Route path = "/pergunta_view/:id" component = {ViewPerguntaComponent}></Route>
                        <Route path = "/pergunta_edit/:id" component = {UpdatePerguntaComponent}></Route>
                          <Route component={NotFound}></Route>
                          {/* <Route path = "/view-employee/:id" component = {ViewEmployeeComponent}></Route>
                          <Route path = "/update-employee/:id" component = {UpdateEmployeeComponent}></Route> */}
                    </Switch>
                </div>
              <FooterComponent />
        </Router>
    </div>
    
  );
}

export default App;