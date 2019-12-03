import 'bootstrap/dist/css/bootstrap.css';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import '../styles/navlink.css';

class aboutContainer extends Component {


render() {
    return (
        <div>
            <span className="login-page-title"> About Us </span>
                <div className="App__Form">
                    <div className="PageSwitcher">
                    <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
                    <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                    </div>
                </div>
        </div>
);
}
}

export default aboutContainer;