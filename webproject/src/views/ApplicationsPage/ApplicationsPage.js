import { connect } from 'react-redux';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import ExpandableTable from "components/ExpandableTable/ExpandableTable.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CustomInput from "components/CustomInput/CustomInput.js";
import { TextField } from "@material-ui/core"
import AddIcon from '@material-ui/icons/Add';
import { getAdvr } from "redux/actions/advertisement";
import { getApps, getAdvrs } from "redux/actions/company";
import { select } from '../../../node_modules/redux-saga/effects';
import RemoveIcon from '@material-ui/icons/Remove';
import ExpansionPanel from "components/ExpansionPanel/ExpansionPanel.js"
import ApplicationDetails from "components/ApplicationDetails/ApplicationDetails.js"

class ApplicationsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedAd: null,
            action: null,
            orderBy: 'id',
            order: 'desc'
        };
    }

    componentDidMount() {
        const { getApplications, getAdvertisements } = this.props;
        getApplications();
        getAdvertisements();
    }

    getApplicationsAsArray = () => {
        const { company } = this.props;
        var applicationsArr = []
        company.applications.forEach(obj => {
            applicationsArr.push([obj.id, obj.advertisementId, obj.postDate, obj.issuedBy, new Boolean(obj.resolved).toString()]);
        });
        return applicationsArr;
    }
    onClickEdit = e => {
        const { company, getAdvertisement } = this.props;

        var adId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        let payload = {
            advertisementId: parseInt(adId)
        }
        getAdvertisement(payload);

        var selectedAd = company.advertisements.filter(ad => ad.id === parseInt(adId))[0];
        this.setState({
            selectedAd: selectedAd,
            action: 'edit'
        })
    }
    onClickDelete = e => {
        const { company } = this.props;
        var adId = e.currentTarget.parentElement.parentElement.children[0].innerHTML;
        var selectedAd = company.advertisements.filter(ad => ad.id === parseInt(adId))[0];
        this.setState({
            selectedAd: selectedAd,
            action: 'delete'
        })
    }

    toStandardDate(date, pattern) {
        var patternArr = pattern.split('-');
        var dateArr = date.split('-');
        var day;
        var month;
        var year;

        var i;
        for (i = 0; i < patternArr.length; i++) {
            if (patternArr[i] === 'dd') {
                day = dateArr[i];
            } else if (patternArr[i] === 'MM') {
                month = dateArr[i];
            } else if (patternArr[i] === 'yyyy') {
                year = dateArr[i];
            }
        }

        return `${year}-${month}-${day}`;
    }

    setSort(orderBy, order) {
        this.setState({
            order,
            orderBy
        })
    }

    render() {
        const { classes, applications, advertisements } = this.props;
        var tableHead;
        if (applications && advertisements) {
            var details = [...applications];
            details = details.map(detail => {
                var app = { ...detail };
                const advertisement = advertisements.filter(ad => ad.id === app.advertisementId)[0];
                var feedback = app.feedback;
                delete app.feedback;
                app.matchRate = Math.round(app.matchRate * 100)
                return { header: app, body: advertisement, feedback: feedback }
            });
            details = details.filter(detail => typeof detail.body === 'object');
            tableHead = Object.keys(applications[0]).filter(key => key !== "feedback");
        }
        return (
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                    <Card>
                        <CardHeader color="info" plain>
                            <h4 className={classes.cardTitleDark}>Incoming Applications</h4>
                            <p className={classes.cardCategoryDark}>
                                Sorted by {`${this.state.orderBy} ${this.state.order}ending`}
                            </p>
                        </CardHeader>
                        <CardBody>
                            {applications && advertisements ?
                                <ExpandableTable
                                    setSort={(orderBy, order) => { this.setSort(orderBy, order) }}
                                    tableHeaderColor="info"
                                    tableHead={tableHead}
                                    tableData={details}
                                    tableBody={ApplicationDetails}
                                /> : null}
                        </CardBody>
                    </Card>
                </GridItem>
                {/* <GridItem xs={12} sm={12} md={12}> //////this.getApplicationsAsArray()
                    <ExpansionPanel />
                </GridItem> */}
            </GridContainer>
        );
    }
}



const mapStateToProps = state => {
    return {
        company: state.company.company,
        professions: state.profession.professions,
        advertisement: state.advertisement.advertisement,
        applications: state.company.applications,
        advertisements: state.company.advertisements
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAdvertisement: bindActionCreators(getAdvr.request, dispatch),
        getApplications: bindActionCreators(getApps.request, dispatch),
        getAdvertisements: bindActionCreators(getAdvrs.request, dispatch)
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
    },
    cardCategoryDark: {
        "&,& a,& a:hover,& a:focus": {
            color: "rgba(114, 114, 114)",
            margin: "0",
            fontSize: "14px",
            marginTop: "0",
            marginBottom: "0"
        },
        "& a,& a:hover,& a:focus": {
            color: "#FFFFFF"
        }
    },
    cardTitleDark: {
        color: "#727272",
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
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ApplicationsPage));