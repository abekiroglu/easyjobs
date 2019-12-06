import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";


class NewAdvertisementPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getAdvertisementsAsArray = () => {
        const { company } = this.props;
        var adsArr = []
        company.advertisements.forEach(obj => {
            adsArr.push([obj.id, obj.publishDate, obj.validUntil, obj.description, obj.requirements.length, obj.comments.length]);
        });
        return adsArr;
    }

    render() {
        const { classes } = this.props;
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="primary">
                            <h4 className={classes.cardTitleWhite}>New Advertisement</h4>
                            <p className={classes.cardCategoryWhite}>
                                Sorted by publishment order
                            </p>
                        </CardHeader>
                        <CardBody>
                            <div> TODO </div>
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        );
    }
}



const mapStateToProps = state => {
    return {
        company: state.company.company
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};


const styles = {
    cardCategoryWhite: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(255,255,255,.62)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleWhite: {
        color: "#FFFFFF",
        marginTop: "0px",
        minHeight: "auto",
        fontWeight: "300",
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        marginBottom: "3px",
        textDecoration: "none",
        "& small": {
            color: "#777",
            fontSize: "65%",
            fontWeight: "400",
            lineHeight: "1"
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NewAdvertisementPage));