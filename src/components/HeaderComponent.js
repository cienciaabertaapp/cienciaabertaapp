import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark text-light text-center">
                    <div style={{ fontSize:"xx-large"}}>Ciência Aberta App</div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent