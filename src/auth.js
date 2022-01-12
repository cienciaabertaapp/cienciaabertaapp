import LoginUsuarioComponent from "./components/LoginUsuarioComponent";
import {Redirect} from "react-router-dom";
import {React} from "react";
import {removeUsuario} from "./dadosGlobais";

export const TOKEN_KEY = "@cienciaabertaapp-Token";


export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;


export const getToken = () => localStorage.getItem(TOKEN_KEY);


export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
    return parseJwt();
};


export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    removeUsuario();
    window.location.href = "/";
};

export const parseJwt = () => {
    try {
        let token = localStorage.getItem("@cienciaabertaapp-Token");
        let jsonJwt =  JSON.parse(atob(token.split('.')[1]));
        let tipoUsuario = jsonJwt['tipoUsuario'].toString();
        return tipoUsuario;
    } catch (e) {
        return null;
    }
};

