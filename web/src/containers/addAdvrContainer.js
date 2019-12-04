import 'bootstrap/dist/css/bootstrap.css';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Row } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { redirect } from '../actions/navigation';
import { ErrorField } from '../components/errorField';
import { TextBoxInput} from '../components/textBoxInput';
import { DateInput } from '../components/dateInput';
import '../styles/navlink.css';


import { getMe } from '../actions/company';
import { addAdvr } from '../sagas/advertisement';

class AddAdvrContainer extends Component {
constructor(props) {
    super(props);
    this.state = {
        professionId: null,
        validUntil: null,
        description: null,
        requirements: [],
        publishDate: null
    };
    // "professionId":2,
	// "validUntil":"01-01-2020",
	// "description":"Software Developer Advertisement",
	// "requirements":[
	// 	{"weight": 1.0, "skillId": 0 },
	// 	{"weight": 1.0, "skillId": 1 },
	// 	{"weight": 1.0, "skillId": 2 }
	// 	],
	// "publishDate":"20-11-2019"
}
onDescriptionChange = e => {
    this.setState({ description: e.target.value });
};

onValidUntilChange = e => {
    this.setState({ validUntil: e.target.value });
};
onPublishDateChange = e => {
    this.setState({ publishDate: e.target.value });
};


render() {
    return (
    <div>
        <div className="App__Form">
        <div className="PageSwitcher">
            <NavLink exact to="/main" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Home</NavLink>
            <NavLink exact to="/update-profile" activeClassName="PageSwitcher__Item--Active" className="PageSwitcher__Item">Profile</NavLink>
           </div>
           </div>

        <form onSubmit={this.onClickSubmit}>
        <div className="center">
        <Row>
            <Col lg="5" className="text-center text-md-left">
                 <div className="login-form-div">
                    <h5>Description of Job:</h5>
                </div>
            </Col>
            <Col lg="5" className="text-center text-md-right">
                {/* <div className="login-form-div">
                    <TextBoxInput onChange={this.onDescriptionChange} />
                    </div> */}
                

            </Col>
        </Row>
        <Row>
            <Col lg="5" className="text-center text-md-left">
                 <div className="login-form-div">
                    <h5>Requirements:</h5>
                </div>
            </Col>
            <Col lg="5" className="text-center text-md-right">
                <div className="login-form-div">
                    
                </div>
            </Col>
        </Row>


        <Row>
            <Col lg="5" className="text-center text-md-left">
                 <div className="login-form-div">
                    <h5>Valid Until:</h5>
                </div>
            </Col>
            <Col lg="5" className="text-center text-md-right">
                <div className="login-form-div">
                    <DateInput onChange={this.onValidUntilChange} />
                </div>
            </Col>
        </Row>
        <Row>
            <Col lg="5" className="text-center text-md-left">
                 <div className="login-form-div">
                    <h5>Publish Date:</h5>
                </div>
            </Col>
            <Col lg="5" className="text-center text-md-right">
                <div className="login-form-div">
                    <DateInput onChange={this.onPublishDateChange}  />
                </div>
            </Col>
        </Row>
        <div className="login-form-div" />
            <button type="submit" className="btn btn-success"> Add Advertisement </button>
             <ErrorField error={this.props.error} />

        </div>
        </form>
           </div>        
    );
}

onClickSubmit = e => {
    e.preventDefault();
    const { addAdvr } = this.props;
    const { publishId, validUntil, description, requirements, publishDate } = this.state;
    let body = {
        professionId: publishId,
        validUntil: validUntil,
        description: description,
        requirements: requirements,
        publishDate: publishDate
    };
    addAdvr(body);
};
}

const mapStateToProps = state => {
    return {
       advertisement: state.advertisement.advertisement,
       error: state.advertisement.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        redirect: bindActionCreators(redirect.request, dispatch),
        getMe: bindActionCreators(getMe.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAdvrContainer);
