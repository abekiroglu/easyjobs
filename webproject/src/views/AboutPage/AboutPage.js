import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Quote from "components/Typography/Quote.js";
import Muted from "components/Typography/Muted.js";
import Primary from "components/Typography/Primary.js";
import Info from "components/Typography/Info.js";
import Success from "components/Typography/Success.js";
import Warning from "components/Typography/Warning.js";
import { display } from "../../../node_modules/@material-ui/system";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import CardAvatar from "components/Card/CardAvatar.js";
import styles from "assets/jss/material-dashboard-react/views/aboutPageStyle.js";
import Background from "assets/img/landing-background.jpg";
import { aboutPageEn } from "constants/locale_en.js"
import Divider from "@material-ui/core/Divider";

import avatar1 from "assets/img/faces/atahan-pp.jpg";
import avatar2 from "assets/img/faces/burak-pp.jpg";
import avatar3 from "assets/img/faces/ali-pp.jpg";

const useStyles = makeStyles(styles);

const centeredGridItem = {
    margin: 'auto',
    width: '50%'
}

export default function AboutPage() {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.aboutPageContainer} style={{ backgroundImage: "url(" + Background + ")" }} />
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <h1 className={classes.headerBold}> {aboutPageEn.header}</h1>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <div style={centeredGridItem}>
                        <h4 className={classes.header}> {aboutPageEn.subHeader}</h4>
                    </div>
                </GridItem>
            </GridContainer>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12} style={{ marginBottom: 50 }}>
                    <h3 className={classes.headerBold}> {aboutPageEn.ourTeam}</h3>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar1} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile>
                            <h6 className={classes.cardCategory}>FOUNDER / BACK-END DEVELOPER</h6>
                            <h4 className={classes.cardTitle}>Atahan Bekiroglu</h4>
                            <p className={classes.description}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quis odio bibendum, aliquet eros id, malesuada ligula. Nulla molestie dictum lectus. Nulla eu mauris sapien. Maecenas eget lorem sit amet est hendrerit placerat at non lectus. Suspendisse ac velit vulputate, pulvinar tortor id, malesuada sem. Mauris imperdiet ornare laoreet. Etiam odio tellus, condimentum egestas justo ac, faucibus fringilla diam. Suspendisse potenti.
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar2} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile>
                            <h6 className={classes.cardCategory}>FOUNDER / MOBILE DEVELOPER</h6>
                            <h4 className={classes.cardTitle}>Burak Ozdemir</h4>
                            <p className={classes.description}>
                                Maecenas egestas dui felis, at placerat risus laoreet sit amet. Aliquam fringilla eleifend dolor at auctor. Ut laoreet urna ipsum, nec semper dui viverra eu. Cras gravida augue sit amet varius interdum. Vestibulum tempor lorem at dolor ultrices, ac commodo augue sodales. In in lacinia ipsum, quis molestie nisi. Sed eu nisl eu neque vestibulum ultricies. Morbi maximus dignissim arcu sit amet egestas.
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                        <CardAvatar profile>
                            <a href="#pablo" onClick={e => e.preventDefault()}>
                                <img src={avatar3} alt="..." />
                            </a>
                        </CardAvatar>
                        <CardBody profile>
                            <h6 className={classes.cardCategory}>FOUNDER / WEB DEVELOPER</h6>
                            <h4 className={classes.cardTitle}>Ali Ekber Mufettisoglu</h4>
                            <p className={classes.description}>
                                Mauris id pellentesque mauris. Proin at urna ullamcorper, dapibus massa ac, tempus ligula. Curabitur aliquet nec neque a fermentum. Curabitur justo lorem, sollicitudin ut sem in, laoreet venenatis magna. Aliquam tincidunt eros sit amet quam dapibus, id tempor elit suscipit. Aenean vel purus euismod, condimentum arcu non, tempus dolor. Duis ut venenatis turpis. Curabitur nec rutrum ante. Vestibulum egestas diam tortor.
                            </p>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    );
}
