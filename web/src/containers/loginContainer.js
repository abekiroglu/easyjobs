import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';
import { Link } from 'react-router-dom';

import { redirect } from '../actions/navigation';
import { PasswordInput } from '../components/passwordInput';
import { UsernameInput } from '../components/usernameInput';
import { CheckBox } from '../components/checkBox';
import { ErrorField } from '../components/errorField';

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
        <span className="login-page-title"> Welcome. </span>
        <form onSubmit={this.onClickLogin}>
        <div className="center">
            <div className="login-form-div">
            <UsernameInput onChange={this.onUsernameChange} />
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
