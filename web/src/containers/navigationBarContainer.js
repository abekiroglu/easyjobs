import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';

import { getMe } from '../actions/company';
class NavigationBarContainer extends Component {
    constructor(props) {
        super(props);

    }


    componentDidMount() {
        const { getMe } = this.props;
        if (!this.props.company) {
            getMe();
        }
    }

    render() {
        return (
            null
        );
    }

}

const mapStateToProps = state => {
    return {
        company: state.company.company,
        isLoading: state.company.isLoading,
        hasError: state.company.hasError,
        error: state.company.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMe: bindActionCreators(getMe.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBarContainer);
