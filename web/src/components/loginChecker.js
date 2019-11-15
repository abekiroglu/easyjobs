import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { redirect } from '../actions/navigation';
import { loginCompany } from '../actions/company';

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

    componentDidMount() {
        const { loginCompany } = this.props;
        loginCompany({ email: 'abekiroglu14@ku.edu.tr', password: 'ezjobs' })
        this.redirectToMenu();
    }


    redirectToMenu = e => {
        const { redirect } = this.props;
        let payload = {
            path: '/login'
        };
        redirect(payload);
    };

    render() {
        return null;
    }


}

const mapDispatchToProps = dispatch => {
    return {
        redirect: bindActionCreators(redirect.request, dispatch),
        loginCompany: bindActionCreators(loginCompany.request, dispatch)
    };
};

export default connect(
    null,
    mapDispatchToProps
)(LoginChecker);