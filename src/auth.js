import LoginUsuarioComponent from "./components/LoginUsuarioComponent";
import {Redirect} from "react-router-dom";
import {React} from "react";

export const TOKEN_KEY = "@demo-Token";


export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;


export const getToken = () => localStorage.getItem(TOKEN_KEY);


export const login = token => {
    localStorage.setItem(TOKEN_KEY, token);
};


export const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    window.location.href = "/";
};