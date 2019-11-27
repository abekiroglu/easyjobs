import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';

import { redirect } from '../actions/navigation';
import { PasswordInput } from '../components/passwordInput';
import { UsernameInput } from '../components/usernameInput';
import { CheckBox } from '../components/checkBox';
import { ErrorField } from '../components/errorField';
import { EmailInput } from '../components/emailInput';

import '../styles/navlink.css';


import { loginCompany, getMe, signupCompany } from '../actions/company';

class signupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null
        };
    }

<<<<<<< HEAD
onEmailChange = e => {
    this.setState({ email: e.target.value });
};

onPasswordChange = e => {
    this.setState({ password: e.target.value });
};


render() {
    return (
    <div>
        <div className="App__Form">
      <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
      <NavLink exact to="/about" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">About Us</NavLink>

      </div>
        <span className="login-page-title"> Sign Up </span>
        <form onSubmit={this.onClickLogin}>
        <div className="center">            
            <div className="login-form-div">
            <EmailInput onChange={this.onEmailChange} />
            </div>
            <div className="login-form-div">
            <PasswordInput
                onChange={this.onPasswordChange}
                placeholder="Password"
            />
            </div>
            <div className="login-form-div" />
=======
    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };
    onUsernameChange = e => {
        this.setState({ name: e.target.value });
    };
    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };


    render() {
        return (
>>>>>>> dcd9ff2edb145535d3273c2b2e50d0d7b6e53b25
            <div>
                <div className="App__Form">
                    <NavLink exact to="/" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign In</NavLink>
                </div>
                <span className="login-page-title"> Sign Up </span>
                <form onSubmit={this.onClickLogin}>
                    <div className="center">
                        <div className="login-form-div">
                            <UsernameInput onChange={this.onUsernameChange} />
                        </div>
                        <div className="login-form-div">
                            <EmailInput onChange={this.onEmailChange} />
                        </div>
                        <div className="login-form-div">
                            <PasswordInput
                                onChange={this.onPasswordChange}
                                placeholder="Password"
                            />
                        </div>
                        <div className="login-form-div" />
                        <div>
                            <button type="submit" className="btn btn-primary">
                                Sign Up
            </button>
                            <ErrorField error={this.props.error} />
                        </div>
                    </div>
                </form>
            </div>
        );
    }

<<<<<<< HEAD
onClickLogin = e => {
    e.preventDefault();
    const { signupCompany } = this.props;
    const { email, password, isPersistent } = this.state;
    let body = {
    email: email,
    password: password,
    isPersistent: isPersistent
=======
    onClickLogin = e => {
        e.preventDefault();
        const { signupCompany } = this.props;
        const { name, email, password } = this.state;
        let body = {
            name: name,
            email: email,
            password: password
        };
        signupCompany(body);
>>>>>>> dcd9ff2edb145535d3273c2b2e50d0d7b6e53b25
    };
}

const mapStateToProps = state => {
    return {
        company: state.company.company,
        error: state.company.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        redirect: bindActionCreators(redirect.request, dispatch),
        loginCompany: bindActionCreators(loginCompany.request, dispatch),
        getMe: bindActionCreators(getMe.request, dispatch),
        signupCompany: bindActionCreators(signupCompany.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(signupContainer);
