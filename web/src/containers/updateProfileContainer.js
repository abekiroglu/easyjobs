import 'bootstrap/dist/css/bootstrap.css';
import '../styles/navlink.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'reactstrap';
import { redirect } from '../actions/navigation';

import { CompanyNameInput } from '../components/companyNameInput';
import { ErrorField } from '../components/errorField';
import { DateInput } from '../components/dateInput';
import { TextAreaInput } from '../components/textAreaInput';


import { getMe, updateProfileCompany } from '../actions/company';



class UpdateProfileContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null,
            name: null,
            foundedDate: null
        };
    };

    setname = e => {
        this.setState({ name: e.target.value });
    };

    setFoundedDate = e => {
        var dateArr = e.target.value.split('-');
        var formattedDate = `${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`
        this.setState({ foundedDate: formattedDate });
    };
    setDescription = e => {
        this.setState({ description: e.target.value });
    };

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
                    <NavLink exact to="/main" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Home Page</NavLink>
                </div>
                <div>
                    {this.props.isLoading ? 'Loading...' : null}
                    {this.props.hasError ? <ErrorField error={this.props.error.message} /> : null}
                    {this.props.company ? <div> Welcome {this.props.company.email} </div> : null}
                </div>
                <span className="login-page-title"> Design Profile </span>
                <form onSubmit={this.onClickSubmit}>
                    <div className="center">
                        <div className="login-form-div" />
                        <Row>
                            <Col lg="5" className="text-center text-md-left">
                                <div className="login-form-div">
                                    <h5>Company Name:</h5>
                                </div>
                            </Col>
                            <Col lg="5" className="text-center text-md-right">
                                <div className="login-form-div">
                                    {this.props.company ? <CompanyNameInput onChange={this.setname} placeholder={this.props.company.name} style={{ width: 300 }} /> : null}
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="5" className="text-center text-md-left">
                                <div className="login-form-div">
                                    <h5>Established Date:</h5>
                                </div>
                            </Col>
                            <Col lg="5" className="text-center text-md-right">
                                <div className="login-form-div">
                                    <DateInput onChange={this.setFoundedDate} style={{ width: 300 }} />
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col lg="5" className="text-center text-md-left">
                                <div className="login-form-div">
                                    <h5>Description Of Company:</h5>
                                </div>
                            </Col>
                            <Col lg="5" className="text-center text-md-right">
                                <div className="login-form-div">
                                    <TextAreaInput onChange={this.setDescription} />
                                </div>
                            </Col>
                        </Row>
                        <div className="login-form-div" />
                        <button type="submit" className="btn btn-success"> Update </button>
                        <ErrorField error={this.props.error} />
                    </div>
                </form>
            </div>
        );
    }

    onClickSubmit = e => {
        e.preventDefault();
        const { updateProfileCompany } = this.props;
        const { name, foundedDate, description } = this.state;
        let body = {
            name: name,
            foundedDate: foundedDate,
            description: description
        };
        updateProfileCompany(body);

    };
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
        redirect: bindActionCreators(redirect.request, dispatch),
        getMe: bindActionCreators(getMe.request, dispatch),
        updateProfileCompany: bindActionCreators(updateProfileCompany.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfileContainer);
