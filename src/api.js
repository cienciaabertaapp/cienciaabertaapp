import axios from 'axios';
import {getLocalRefreshToken, getToken, isAuthenticated, TOKEN_KEY} from "./auth";
import {Redirect, Route} from "react-router-dom";
import {React} from "react";

//  http://localhost:8084/
//https://cienciaaberta.herokuapp.com/
// https://fierce-hollows-92158.herokuapp.com/

export const CIENCIAABERTA_API_BASE_URL = "https://cienciaaberta.herokuapp.com/";

const api = axios.create({
    baseURL: CIENCIAABERTA_API_BASE_URL,
    responseType: 'json',
});

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
