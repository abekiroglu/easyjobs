import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardAvatar from '../Card/CardAvatar';
import avatar1 from "assets/img/faces/atahan-pp.jpg";
import Button from "components/CustomButtons/Button.js"
import CustomInput from "components/CustomInput/CustomInput.js"
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import InfoIcon from '@material-ui/icons/Info';
import { updateApp } from "redux/actions/company.js"

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    }
}));


function onClickFeedback(feedback, data, callback) {
    let payload = {
        applicationId: data.header.id,
        body: {
            feedback: feedback,
            isResolved: false
        }
    }
    callback(payload);
}

function onClickAccept(feedback, data, callback) {
    let payload = {
        applicationId: data.header.id,
        body: {
            feedback: feedback,
            isAccepted: true,
            isResolved: true
        }
    }
    callback(payload);
}


function onClickReject(feedback, data, callback) {
    let payload = {
        applicationId: data.header.id,
        body: {
            feedback: feedback,
            isAccepted: true,
            isResolved: true
        }
    }
    callback(payload);
}


function ApplicationDetails(props) {
    const classes = useStyles();
    const { data, updateApp } = props;
    const applicant = data.header.applicant;
    const ad = data.body;
    const skills = applicant.skills;
    const requirements = ad.requirements;
    const [feedback, setFeedback] = React.useState(data.feedback);

    return (
        <div className={classes.root}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card profile>
                        <CardHeader color="warning">
                            <CardAvatar profile>
                                {applicant.picture ? <img src={avatar1} alt="..." /> : null}
                            </CardAvatar>
                            <div> {applicant.name + ' ' + applicant.surname} </div>
                            <div> {applicant.profession.title} </div>
                            <div> Match Rate: {data.header.matchRate} </div>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <div>Email: {applicant.email}</div>
                                    <div>Birth Date: {applicant.birthDate}</div>
                                    <div> Skills:
                                        {skills.map(s => {
                                            return <div> {s.description} </div>
                                        })}
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={6}>
                                    <div>Title: {ad.title}</div>
                                    <div>Valid Until: {ad.validUntil}</div>
                                    <div> Skills:
                                        {requirements.map(r => {
                                            return <div> {r.skill.description} </div>
                                        })}
                                    </div>
                                </GridItem>
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomInput
                                        labelText={data.header.resolved || data.header.accepted ? "Your feedback" : "Give feedback to the applicant"}
                                        id="feedback"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
                                            disabled: data.header.resolved || data.header.accepted,
                                            multiline: true,
                                            rows: 5,
                                            onChange: e => { setFeedback(e.currentTarget.value) },
                                            defaultValue: feedback
                                        }}
                                    />
                                </GridItem>
                            </GridContainer>
                        </CardBody>
                        <CardFooter>
                            {!data.header.resolved && !data.header.accepted ?
                                <Button
                                    color={feedback.length > 10 && data.feedback !== feedback ? 'primary' : 'transparent'}
                                    disabled={feedback.length > 10 && data.feedback !== feedback ? false : true}
                                    onClick={e => { onClickFeedback(feedback, data, updateApp) }}>
                                    <InfoIcon />
                                    <div>
                                        Provide Feedback
                                    </div>
                                </Button>
                                : null}
                            {data.header.issuedBy !== "Company" || (!data.header.resolved && !data.header.accepted) ?
                                <div>
                                    <Button
                                        color={feedback.length > 10 && data.feedback !== feedback ? 'danger' : 'transparent'}
                                        disabled={feedback.length > 10 && data.feedback !== feedback ? false : true}
                                        onClick={e => { onClickReject(feedback, data, updateApp) }}>
                                        <ClearIcon />
                                        <div>
                                            Reject
                                        </div>
                                    </Button>
                                    <Button
                                        color={feedback.length > 10 && data.feedback !== feedback ? 'success' : 'transparent'}
                                        disabled={feedback.length > 10 && data.feedback !== feedback ? false : true}
                                        onClick={e => { onClickAccept(feedback, data, updateApp) }}>
                                        <CheckIcon />
                                        <div>
                                            Accept
                                        </div>
                                    </Button>
                                </div>
                                : <div />}
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}




const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
        updateApp: bindActionCreators(updateApp.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationDetails);