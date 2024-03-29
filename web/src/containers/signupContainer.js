import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';

import { redirect } from '../actions/navigation';
import { PasswordInput } from '../components/passwordInput';
import { CompanyNameInput } from '../components/companyNameInput';
import { ErrorField } from '../components/errorField';
import { EmailInput } from '../components/emailInput';

import '../styles/navlink.css';


import { loginCompany, getMe, signupCompany } from '../actions/company';

class SignupContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null
        };
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };
    onNameChange = e => {
        this.setState({ name: e.target.value });
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
                            <CompanyNameInput onChange={this.onNameChange} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
