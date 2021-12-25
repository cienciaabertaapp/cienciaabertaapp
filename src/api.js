import axios from 'axios';
import { getToken } from "./auth";
import { CIENCIAABERTA_API_BASE_URL } from './services/CienciaAbertaService';


const api = axios.create({
    baseURL: CIENCIAABERTA_API_BASE_URL,
    responseType: 'json'
});


api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export default api;