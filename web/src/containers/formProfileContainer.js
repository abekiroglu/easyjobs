import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';

import { redirect } from '../actions/navigation';
import { PasswordInput } from '../components/passwordInput';
import { EmailInput } from '../components/emailInput';
import { CompanyNameInput } from '../components/companyNameInput';
import { ErrorField } from '../components/errorField';


import { loginCompany, getMe, signupCompany,formProfileCompany } from '../actions/company';
import '../styles/navlink.css';


class formProfileContainer extends Component {
 constructor(props) {
    super(props);
};

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
         
         <div className="App__Form">
             <NavLink exact to="/main" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Home Page</NavLink> 
        </div>
        <span className="login-page-title"> Design Profile </span>
        <form onSubmit={this.onClickSubmit}>
        <div className="center">
           
            <div className="login-form-div">   
            <EmailInput
                onChange={this.onEmailChange}
                placeholder="e-mail"
            />
            </div>

            <div className="login-form-div">
                <PasswordInput
                label="Password"
                 onChange={this.onPasswordChange}
                placeholder="password"
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

onClickSubmit = e => {
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
        isLoading: state.company.isLoading,
        hasError: state.company.hasError
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
