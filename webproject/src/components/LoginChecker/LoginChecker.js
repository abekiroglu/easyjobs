import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import history from "history.js"
import { getMe } from "redux/actions/company";
import { LOCAL_STORAGE } from '../../constants/misc';

class LoginChecker extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        var token = localStorage.getItem(LOCAL_STORAGE);
        const { company, error, getMe } = this.props;
        if (!token) {
            history.push('/landing/login')
        }
        if (!company) {
            getMe();
        }
        if (error) {
            history.push('/landing/login');
        }
    }

    componentDidUpdate(prevProps, prevState) {
        var token = localStorage.getItem(LOCAL_STORAGE);
        const { company, error, getMe } = this.props;
        if (!token) {
            history.push('/landing/login')
        }
        if (!company) {
            getMe();
        }
        if (error) {
            history.push('/landing/login');
        }
    }

    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        company: state.company.company,
        error: state.company.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMe: bindActionCreators(getMe.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginChecker);
