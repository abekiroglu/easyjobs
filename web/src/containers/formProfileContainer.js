import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';

import { redirect } from '../actions/navigation';
import { PasswordInput } from '../components/passwordInput';
import { EmailInput } from '../components/emailInput';
import { CompanyNameInput } from '../components/companyNameInput';
import { ErrorField } from '../components/errorField';


import { loginCompany, getMe, signupCompany,formProfileCompany } from '../actions/company';

class formProfileContainer extends Component {

onCompanyNameChange = e => {
    this.setState({ companyName: e.target.value });
};

onPasswordChange = e => {
    this.setState({ password: e.target.value });
};

onEmailChange = e => {
    this.setState({ email: e.target.value });
};

render() {
    return (
       
    <div>
        <span className="login-page-title"> Design Profile </span>
        <form onSubmit={this.onClickLogin}>
        <div className="center">
           
            <div className="login-form-div">   
            <EmailInput
                onChange={this.onEmailChange}
                placeholder="Write e-mail"
            />
            </div>
            
            <div className="login-form-div">
                <PasswordInput
                 onChange={this.onPasswordChange}
                placeholder="Password"
                />
             </div>

             <div className="login-form-div">
                <CompanyNameInput
                 onChange={this.onCompanyNameChange}
                 placeholder="CompanyName"
                />
             </div>

            <div className="login-form-div" />
            <div>
            <button type="submit" className="btn btn-primary">
                Submit
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
    const { formProfileCompany } = this.props;
    const { companyName, email, password} = this.state;
    let body = {
    companyName: companyName,
    email: email,
    password: password,
    };
    formProfileCompany(body);
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
        signupCompany: bindActionCreators(signupCompany.request, dispatch),
        formProfileCompany: bindActionCreators(formProfileCompany.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(formProfileContainer);
