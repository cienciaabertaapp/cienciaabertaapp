import React, { Component, useState } from 'react'
import CienciaAbertaService from '../services/CienciaAbertaService';
import {ErrorMessage,Formik,Form,Field} from "formik"
import * as yup from 'yup'
import * as cors from 'cors'
import axios from "axios";

class LoginUsuarioComponent extends Component {



    cancel(){
        this.props.history.push('/');
    }


    handleSubmit = (values) => {
       /* let express = require('express');
        let cors = require('cors');
        let app = express();
         preventDefault
        app.use(cors);
        console.log((values));
        cors.caller(console.log(CienciaAbertaService.loginUsuario(values)));
        console.log((values));
        /*app.listen(8084, function () {
            console.log('CORS-enabled web server listening on port 80');
        })*/

        CienciaAbertaService.loginUsuario(JSON.stringify(values))
            .then(resp => {
                console.log(resp)
            })


     /*   axios.post('http://localhost:8084/user_login',{
            method:"POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : 'http://localhost:3000/*'
            },
            body: { key: values }
        }).then(resp => {
            console.log(resp)
        })*/


    }

    render(){

     /*  const handleSubmit = values => {
          // CienciaAbertaService.createUsuario(usuario).
          // axios.post('http://localhost:8084/login',values)
           //    .then(resp => console.log(resp))


        /*   axios.post('http://localhost:8084/login', JSON.stringify( values), {
               mode: 'no-cors',
               headers: {
                   'Accept': 'application/json',
                   'Content-Type': 'application/json',
                   'Access-Control-Allow-Origin': 'http://localhost:3000/',
               },
               withCredentials: false,
               credentials: 'same-origin',
           }).then(resp => {
               console.log(resp)
           })

           CienciaAbertaService.loginUsuario(values)
               .then(resp => {
               console.log(resp)
           });

          // axios.post('/login',values)
          //

       }
*/

        const  validations = yup.object().shape({
            emailUsuario: yup.string().email().required(),
            senhaUsuario: yup.string().min(3).required()
        })
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3"> <h3 className="text-center">Acessar minha área</h3>

                                <div className = "card-body">
                                   <Formik initialValues={{}} onSubmit={this.handleSubmit} validationSchema={validations}>
                                    <Form className="Form">

                                        <div className = "Form-group">
                                            <label> Email: </label>
                                            <Field  placeholder="Email" id="emailUsuario" name="emailUsuario" className="form-control"/>
                                            <ErrorMessage componet="span" name="emailUsuario" className="Form-Field"/>
                                        </div>


                                        <div className = "Form-group">
                                            <label> Senha: </label>
                                            <Field placeholder="Email" id="senhaUsuario" name="senhaUsuario" className="form-control"/>
                                            <ErrorMessage componet="span" name="senhaUsuario" className="Form-Field"/>
                                            <br></br>
                                        </div>

                                        <button onClick={"submit"} className="btn btn-success" >Entrar</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancelar</button>
                                    </Form>
                                   </Formik>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default LoginUsuarioComponent