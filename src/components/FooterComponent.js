import React, { Component } from 'react'
import {enableDismissTrigger} from "bootstrap/js/src/util/component-functions";
import logo from '../assets/img/logo.jpeg';

class FooterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <img align="flex-end" src={logo} width="200" height="200" />
                <footer className = "footer text-end" >
                    <span className="text-dark" >All Rights Reserved 2021 @Hoy</span>
                </footer>
            </div>
        )
    }
}

export default FooterComponent