import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';
import { Link, NavLink } from 'react-router-dom';

import { redirect } from '../actions/navigation';
import { PasswordInput } from '../components/passwordInput';
import { EmailInput } from '../components/emailInput';
import { CheckBox } from '../components/checkBox';
import { ErrorField } from '../components/errorField';
import '../styles/navlink.css';


import { loginCompany, getMe } from '../actions/company';

class LoginContainer extends Component {
constructor(props) {
    super(props);
    this.state = {
    email: null,
    password: null
    };
}

onUsernameChange = e => {
    this.setState({ email: e.target.value });
};

onPasswordChange = e => {
    this.setState({ password: e.target.value });
};

onKeepMeLoggedInChecked = e => {
    this.setState({
    isPersistent: this.state.isPersistent ? !this.state.isPersistent : true
    });
};

render() {
    return (
       
    <div>
        <span className="login-page-title"> Sign In </span>
        <div className="App__Form">
        <div className="PageSwitcher">
            <NavLink exact to="/sign-up" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Sign Up</NavLink>
            <NavLink exact to="/about" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">About Us</NavLink>

           </div>
        </div>
        <form onSubmit={this.onClickLogin}>
        <div className="center">
            <div className="login-form-div">
            <EmailInput onChange={this.onUsernameChange} />
            </div>
            <div className="login-form-div">
            <PasswordInput
                onChange={this.onPasswordChange}
                placeholder="Password"
            />
            </div>
            <Row>
            <Col lg="9" className="text-center text-md-left">
                <CheckBox
                label="Keep me logged in"
                onChecked={this.onKeepMeLoggedInChecked}
                />
            </Col>
            <Col lg="3" className="text-center text-md-right">
                <Link to="/reset" className="password-reset-link">
                Forgot password?
                </Link>
            </Col>
            </Row>
            <div className="login-form-div" />
            <div>
            <button type="submit" className="btn btn-primary">
                Sign in
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
    const { loginCompany } = this.props;
    const { email, password, isPersistent } = this.state;
    let body = {
    email: email,
    password: password,
    isPersistent: isPersistent
    };
    loginCompany(body);
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
        getMe: bindActionCreators(getMe.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
