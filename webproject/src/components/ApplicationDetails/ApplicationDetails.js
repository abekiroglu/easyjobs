import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Danger from "components/Typography/Danger.js";
import Icon from "@material-ui/core/Icon";
import Warning from "@material-ui/icons/Warning";
import CardAvatar from '../Card/CardAvatar';
import avatar1 from "assets/img/faces/atahan-pp.jpg";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    }
}));


export default function ExpandableRow(props) {
    const classes = useStyles();
    const { data } = props;
    return (
        <div className={classes.root}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card profile>
                        <CardHeader color="warning">
                            <CardAvatar profile>
                                {data.applicant.picture ? <img src={avatar1} alt="..." /> : null}
                            </CardAvatar>
                        </CardHeader>
                        <CardBody>
                            <h4 className={classes.cardTitle}>Email Subscriptions</h4>
                            <p className={classes.cardCategory}>Last Campaign Performance</p>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}