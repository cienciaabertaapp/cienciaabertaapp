import axios from 'axios';
import {getToken, isAuthenticated} from "./auth";
import { CIENCIAABERTA_API_BASE_URL } from './services/CienciaAbertaService';
import {Redirect, Route} from "react-router-dom";
import {React} from "react";


const api = axios.create({
    baseURL: CIENCIAABERTA_API_BASE_URL,
    responseType: 'json'
});


api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;

    }
   //console.log(config.headers.Authorization);
    return config;
});


export default api;