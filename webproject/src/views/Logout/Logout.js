import React from 'react'
import history from "history.js"
import { LOCAL_STORAGE } from '../../constants/misc';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from "redux/actions/company"

function Logout(props) {
    const { logout } = props;
    logout();
    return null;
}


const mapDispatchToProps = dispatch => {
    return {
        logout: bindActionCreators(logout.request, dispatch)
    };
};


export default connect(null, mapDispatchToProps)(Logout);
