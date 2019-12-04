import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { ErrorField } from '../components/errorField'
import { TextBoxInput } from '../components/textBoxInput'
import { Col, Row } from 'reactstrap';
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
            <div>
             {this.props.isLoading ? 'Loading...' : null}
             {this.props.hasError ? <ErrorField error={this.props.error.message} /> : null}
             {this.props.company ?
            <div> 
                <div className="App__Form">
                    <NavLink exact to="/update-profile" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Profile</NavLink>
                    <NavLink exact to="/add-advr" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Add Advertisements</NavLink>

                </div>
                <h5 style = {{paddingLeft: 1400}}>{this.props.company.email}</h5>
                
                <div className="center">
                
                    <div className="login-form-div">
                       <Row> 
                            <Col  lg="15" className="text-center text-md-left">
                                <span className="login-page-title" style={{ width: 600 }}> Search a qualification or a person name </span>  
                           </Col>
                        </Row>
                        <div className="login-form-div"/> 
                        <div className="login-form-div"/> 
                        <div className="login-form-div"/> 
                        <div className="login-form-div"/> 
                        <Row style = {{paddingLeft: 40}} >
                            <Col  lg="8" className="text-center text-md-left">
                                <div className="login-form-div"/> 
                                <div className="login-form-div"/> 
                                <div className="login-form-div"/> 
                                <TextBoxInput style={{ width: 500 }} placeholder="Write here"/>
                            </Col>
                            <Col lg="8" className="text-center text-md-right">
                                <div className="login-form-div"/> 
                                <button type="button"  style={{ width: 200 }} class="btn btn-success">Search</button>
                            </Col>
                        </Row>
                    </div>
                </div>
              </div> : null}
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
