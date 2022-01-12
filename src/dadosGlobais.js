import {React, Context, createContext} from "react";
import {parseJwt, TOKEN_KEY} from "./auth";

export const ID_USUARIO = '';


export const usuario = idusuario => {
    localStorage.setItem(ID_USUARIO, idusuario);
};

export const getUsuario = () => localStorage.getItem(ID_USUARIO);

export const removeUsuario = () => {
    localStorage.removeItem(ID_USUARIO);
};