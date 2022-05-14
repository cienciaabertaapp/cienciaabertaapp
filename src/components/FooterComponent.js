import React, { Component } from 'react'
import {enableDismissTrigger} from "bootstrap/js/src/util/component-functions";
import logo from '../assets/img/logo.jpeg';
import dr from '../assets/img/dr.jpeg';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div >
                <br></br>
                <img align="flex-end" src={logo} width="200" height="200" />
                <footer className = "footer text-end" >
                    <span className="text-dark" >All Rights Reserved 2021 <a href="https://creativecommons.org/licenses/by/4.0"><img src={dr} width="50" height="25" /> </a></span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent