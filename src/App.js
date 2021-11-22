import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import DefaultComponent from './components/DefaultComponent';
import HeaderComponent from './components/HeaderComponent';
import FooterComponent from './components/FooterComponent';
import CreateUsuarioComponent from './components/CreateUsuarioComponent';
import LoginUsuarioComponent from './components/LoginUsuarioComponent';
import AnswerSearchComponent from "./components/AnswerSearchComponent";
//import ViewEmployeeComponent from './components/ViewEmployeeComponent';

function App() {
  return (
    <div>
        <Router>
              <HeaderComponent />
                <div className="container">
                    <Switch>
                          <Route path = "/" exact component = {DefaultComponent}></Route>
                          <Route path = "/login" component = {LoginUsuarioComponent}></Route>
                          <Route path = "/usuario" component = {CreateUsuarioComponent}></Route>
                          <Route path = "/pesquisa" component = {AnswerSearchComponent}></Route>
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