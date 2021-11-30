import axios from 'axios';

const CIENCIAABERTA_API_BASE_URL = "http://localhost:8084/";

class CienciaAbertaService {

    createUsuario(usuario){
        return axios.post(CIENCIAABERTA_API_BASE_URL+ 'usuario', usuario);
    }
    buscaUsuario(id){
        return axios.get(CIENCIAABERTA_API_BASE_URL+ 'usuario_busca/'+ id);
    }
    listUsuarios(){
        return axios.get(CIENCIAABERTA_API_BASE_URL+ 'usuario_list');
    }
    deleteUsuario(id){
        return axios.get(CIENCIAABERTA_API_BASE_URL+ 'usuario_delete',id);
    }
    updateUsuario(id,usuario){
        return axios.put(CIENCIAABERTA_API_BASE_URL+ 'usuario_update/'+ id,usuario);
    }
  /*  viewUsuario(id){
        return axios.get(CIENCIAABERTA_API_BASE_URL+ 'usuario_view/'+ id);
    }*/

     loginUsuario(values) {
         return axios.post(CIENCIAABERTA_API_BASE_URL+ 'user_login', values);
     }
    createCategoria(values) {
        return axios.post(CIENCIAABERTA_API_BASE_URL+ 'categoria', values);
    }
    listCategoria() {
        return axios.get(CIENCIAABERTA_API_BASE_URL+ 'categoria_list');
    }

    deleteCategoria(id) {
        return axios.delete(CIENCIAABERTA_API_BASE_URL+ 'categoria_delete',id);
    }

     /*    getEmployeeById(employeeId){
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