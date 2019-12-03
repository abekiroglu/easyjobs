import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { ErrorField } from '../components/errorField'
import { redirect } from '../actions/navigation';

import {getMe } from '../actions/company';
import '../styles/navlink.css';

class MainContainer extends Component {

constructor(props) {
    super(props);

}


componentDidMount() {
    const { getMe } = this.props;
    getMe();
    //loginCompany({ email: 'testcompany@company.com', password: 'ezjobs' })
    //this.redirectToMenu();
}

render() {
    return (
        <div>
            <div className="App__Form">
             <NavLink exact to="/form-profile" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Profile</NavLink> 
            </div>

            <div>
             {this.props.isLoading ? 'Loading...' : null}
             {this.props.hasError ? <ErrorField error={this.props.error.message} /> : null}
             {this.props.company ? <div> Welcome {this.props.company.email} </div> : null}
            </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
