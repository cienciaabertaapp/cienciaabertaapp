import axios from 'axios';
import api, {CIENCIAABERTA_API_BASE_URL} from "../api";


class CienciaAbertaService {

    buscaUsuario(id){
        return api.get( 'usuario_busca/'+ id);
    }

    createUsuario(usuario){
        return api.post('usuario', usuario);
    }

    buscaUsuarioLogin(email){
        return api.get('usuario_busca_login/'+ email);
    }
    listUsuarios(){
        return api.get('usuario_list');
    }
    deleteUsuario(id){
        return api.get('usuario_delete',id);
    }
    updateUsuario(id,usuario){
        return api.put('usuario_update/'+ id,usuario);
    }

     loginUsuario(dados) {
         return api.post('user_login', dados);
     }
    createCategoria(categoria) {
        return api.post('categoria', categoria);
    }
    buscaCategoria(id){
        return api.get('categoria_busca/'+ id);
    }

    updateCategoria(id,categoria){
        return api.put('categoria_update/'+ id,categoria);
    }
    listCategoria() {
        return api.get('categoria_list');
    }

    deleteCategoria(id) {
        return api.delete('categoria_delete/'+ id);
    }

    createPergunta(values) {
        return api.post('perguntas', values);
    }

    listPerguntas(){
        return api.get('perguntas_list');
    }
    buscaPergunta(id){
        return api.get('pergunta_busca/'+ id);
    }
    updatePergunta(id,pergunta){
        return api.put('pergunta_update/'+ id,pergunta);
    }

    buscaPerguntasCategoria(id){
        return api.get('perguntas_categoria?idCategoria='+ id);
    }
    createResposta(respostas){
        return api.post('respostas', respostas);
    }
    listRespostas(){
        return api.get('respostas_list');
    }

    createGrauMaturidade(values) {
        return api.post('grau_maturidade', values);
    }
    buscaGrauMaturidade(id){
        return api.get('grau_maturidade_busca/'+ id);
    }

    updateGrauMaturidade(id,categoria){
        return api.put('grau_maturidade_update/'+ id,categoria);
    }
    listGrauMaturidade() {
        return api.get('grau_maturidade_list');
    }

    deleteGrauMaturidade(id) {
        return api.delete('grau_maturidade_delete/' + id);
    }


    buscaPesquisa(id){
        return api.get('pesquisa_usuario/'+ id);
    }

    enviaEmail(id){
        return api.get('email_send/'+ id);
    }

    updateDivulgaResposta(id,divulga){
        return api.put('pergunta_update_divulga/'+ id, divulga);
    }


    createGlossario(glossario) {
        return api.post('glossario', glossario);
    }
    buscaGlossario(id){
        return api.get('glossario_busca/'+ id);
    }

    updateGlossario(id,glossario){
        return api.put('glossario_update/'+ id,glossario);
    }

    listGlossario() {
        return api.get('glossario_list');
    }

    deleteGlossario(id) {
        return api.delete('glossario_delete/'+ id);
    }


    createApresentacao(apresentacao) {
        return api.post('apresentacao', apresentacao);
    }
    buscaApresentacao(id){
        return api.get('apresentacao_busca/'+ id);
    }

    updateApresentacao(id,apresentacao){
        return api.put('apresentacao_update/'+ id,apresentacao);
    }
    listApresentacao() {
        return api.get('apresentacao_list');
    }

    deleteApresentacao(id) {
        return api.delete('apresentacao_delete/'+ id);
    }


    createReferencias(referencias) {
        return api.post('referencias', referencias);
    }
    buscaReferencias(id){
        return api.get('referencias_busca/'+ id);
    }

    updateReferencias(id,referencias){
        return api.put('referencias_update/'+ id,referencias);
    }
    listReferencias() {
        return api.get('referencias_list');
    }

    deleteReferencias(id) {
        return api.delete('referencias_delete/'+ id);
    }


}

export default new CienciaAbertaService()