import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { ErrorField } from '../components/errorField'
import { redirect } from '../actions/navigation';

import { loginCompany, getMe } from '../actions/company';

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
            {this.props.isLoading ? 'Loading...' : null}
            {this.props.hasError ? <ErrorField error={this.props.error.message} /> : null}
            {this.props.company ? <div> Welcome {this.props.company.email} </div> : null}
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
