import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { redirect } from '../actions/navigation';
import { loginCompany, getMe } from '../actions/company';

class LoginChecker extends Component {
    // If no token in local storage, redirect to login
    // If token exists:
    //    If user doesn't exist in state, ask BE for user info, allow redirection to requested page
    //    If user exists in state, allow redirection to requested page

    constructor(props) {
        super(props);
        this.state = {
        };
    }



    redirectToMenu = e => {
        const { redirect } = this.props;
        let payload = {
            path: '/login'
        };
        redirect(payload);
    };

    render() {
        return <div>
            { this.props.isLoading ?  <div>Ata</div> : null }
            { this.props.hasError ? <div>Ali</div> : null}
        </div>
    }


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
        getMe: bindActionCreators(getMe.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker);