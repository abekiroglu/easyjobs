import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import history from "history.js"
import { loginCompany, getMe } from "redux/actions/company";
import { redirect } from "redux/actions/navigation";
import Background from "assets/img/landing-background.jpg";

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null
        };
    }

    onEmailChange = e => {
        this.setState({ email: e.target.value });
    };

    onPasswordChange = e => {
        this.setState({ password: e.target.value });
    };

    onClickLogin = e => {
        e.preventDefault();
        const { loginCompany } = this.props;
        const { email, password } = this.state;
        let body = {
            email: email,
            password: password
        };
        loginCompany(body);
    };

    componentDidUpdate(prevProps, prevState) {
        const { company, firebaseUser, getMe, aStatus, cStatus, pStatus } = this.props;
        if (firebaseUser && !company && aStatus !== 401 && cStatus !== 401 && pStatus !== 401) {
            getMe();
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <div className={classes.aboutPageContainer} style={{ backgroundImage: "url(" + Background + ")" }} />
                <div className={classes.loginDiv}>
                    <Card>
                        <CardHeader color="primary" plain>
                            <h3 className={classes.cardTitleWhite}>Sign In</h3>
                            <Link to='/admin' className={classes.link}>
                                <p className={classes.forgotPasswordLink}>Forgot password?</p>
                            </Link>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Email address"
                                        id="email-address"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{ onChange: this.onEmailChange }}
                                    />
                                </GridItem>
                            </GridContainer>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText="Password"
                                        id="password"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{ onChange: this.onPasswordChange, type: 'password' }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            <Button color="success" onClick={this.onClickLogin}>Sign in</Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        company: state.company.company,
        error: state.company.error,
        firebaseUser: state.company.firebaseUser,
        aStatus: state.advertisement.status,
        cStatus: state.company.status,
        pStatus: state.profession.status
    };
};

const mapDispatchToProps = dispatch => {
    return {
        redirect: bindActionCreators(redirect.request, dispatch),
        loginCompany: bindActionCreators(loginCompany.request, dispatch),
        getMe: bindActionCreators(getMe.request, dispatch)
    };
};

const styles = {
    forgotPasswordLink: {
        color: "rgba(33, 63, 106)",
        textDecoration: "underline",
        fontSize: "14px",
        margin: "auto",
        marginTop: "0",
        marginBottom: "0"
    },
    link: {
        textAlign: "right",
        float: 'right'
    },
    loginDiv: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        WebkitTransform: 'translate(-50%, -50%)',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '50%'
    },
    cardTitleWhite: {
        color: "rgba(222, 222, 222)",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none"
    },
    aboutPageContainer: {
        position: "absolute",
        zIndex: "-1",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        display: "inline-block",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        "&:after": {
            position: "absolute",
            zIndex: "-1",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            content: '""',
            display: "block",
            background: 'black',
            opacity: ".75"
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginPage));
