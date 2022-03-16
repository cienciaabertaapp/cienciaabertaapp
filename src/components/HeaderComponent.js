import React, { Component } from 'react'
import {Link} from "react-router-dom";
import {Button} from "@mui/material";

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div >
                <header>
                    <br></br>
                    <nav  className="navbar navbar-expand-md navbar-dark bg-dark text-light text-center fixed-top">
                    <div style={{ fontSize:"xx-large"}}><Link to='/' style={{ textDecoration: 'none', color:'white' }}> Ciência Aberta</Link> </div>
                    </nav>
                </header>
                <br></br>
            </div>
        )
    }
}

export default HeaderComponent