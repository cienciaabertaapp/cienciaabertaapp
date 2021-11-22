import axios from 'axios';

const CIENCIAABERTA_API_BASE_URL = "http://localhost:8084/";

class CienciaAbertaService {

    getUsuarios(){
        return axios.get(CIENCIAABERTA_API_BASE_URL);
    }

   createUsuario(usuario){
        return axios.post(CIENCIAABERTA_API_BASE_URL, usuario);
    }
/*
    getEmployeeById(employeeId){
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }*/
}

export default new CienciaAbertaService()