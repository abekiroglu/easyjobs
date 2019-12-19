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
import Button from "components/CustomButtons/Button.js"
import CustomInput from "components/CustomInput/CustomInput.js"
import CheckIcon from '@material-ui/icons/Check';
import { hire } from "redux/actions/company.js"

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    }
}));

function onClickHire(feedback, data, dispatch) {
    let payload = {
        advertisementId: data.body.id,
        userId: data.header.id,
        body: {
            feedback: feedback
        }
    }
    dispatch(payload);
}

function RecommendedUserDetails(props) {
    const classes = useStyles();

    const { data, hire } = props;
    const candidate = data.header;
    const ad = data.body;
    const skills = candidate.skills;
    const requirements = ad.requirements;
    const [feedback, setFeedback] = React.useState("");

    return (
        <div className={classes.root}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card profile>
                        <CardHeader color="warning">
                            <CardAvatar profile>
                                {data.picture ? <img src={data.picture} alt="..." /> : null}
                            </CardAvatar>
                            <div> {candidate.name + ' ' + candidate.surname} </div>
                            <div> {data.profession.title} </div>
                            <div> Match Rate: {data.header.matchRate} </div>
                        </CardHeader>
                        <CardBody>
                            <GridContainer>
                                <GridItem xs={12} sm={12} md={6}>
                                    <div>Email: {candidate.email}</div>
                                    <div>Birth Date: {candidate.birthDate}</div>
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
                                        labelText="Give feedback to the candidate"
                                        id="feedback"
                                        formControlProps={{
                                            fullWidth: true
                                        }}
                                        inputProps={{
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
                            <div />
                            <div>
                                <Button
                                    color={feedback.length > 10 && data.feedback !== feedback ? 'success' : 'transparent'}
                                    disabled={feedback.length > 10 && data.feedback !== feedback ? false : true}
                                    onClick={e => { onClickHire(feedback, data, hire) }}>
                                    <CheckIcon />
                                    <div>
                                        Hire
                                    </div>
                                </Button>
                            </div>
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
        hire: bindActionCreators(hire.request, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedUserDetails);