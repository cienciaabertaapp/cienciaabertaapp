import {React} from "react";
import {removeUsuario} from "./dadosGlobais";

export const TOKEN_KEY = "@CienciaAbertaApp";


export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;


export const getToken = () => localStorage.getItem(TOKEN_KEY);



export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
   // console.log(localStorage.getItem(TOKEN_KEY));
    return parseJwt();
};

export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    removeUsuario();
    window.location.href = "/";
};

export const parseJwt = () => {
    try {
        let token = localStorage.getItem("@CienciaAbertaApp");
        let jsonJwt =  JSON.parse(atob(token.split('.')[1]));
        let tipoUsuario = jsonJwt['tipoUsuario'].toString();
        return tipoUsuario;
    } catch (e) {
        return null;
    }
};

export const verificaRota = () => {
    if (parseJwt() != "ADMIN") {
        removeUsuario();
        logout();
        window.location.href = "/user_login/";
    }
};

