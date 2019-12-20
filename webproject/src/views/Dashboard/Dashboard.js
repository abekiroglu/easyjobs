// react plugin for creating charts
import React, { Component } from 'react';
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { bugs, website, server } from "variables/general.js";
import { getStatistics } from "redux/actions/company"
import GroupIcon from '@material-ui/icons/Group';
import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import BusinessIcon from '@material-ui/icons/Business';
import moment from 'moment';
import Chartist from 'chartist';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }


  applicationChart() {
    var delays2 = 80, durations2 = 500;
    const { company } = this.props;
    var labels = []
    for (let i = 0; i < 12; i++) {
      labels[11 - i] = moment().subtract(i, "month").format('MMMM').substring(0, 3);
    }

    var series = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    company.applications.forEach(app => {
      var month = moment().month(app.postDate.split('-')[1] - 1).format('MMM');
      var idx = labels.indexOf(month);
      series[idx]++;
    });

    var largestMonth = 0;
    series.forEach(month => {
      if (month > largestMonth) {
        largestMonth = month
      }
    })

    return {
      data: {
        labels,
        series: [series]
      },
      options: {
        axisX: {
          showGrid: false
        },
        low: 0,
        high: largestMonth,
        chartPadding: {
          top: 0,
          right: 5,
          bottom: 0,
          left: 0
        }
      },
      responsiveOptions: [
        [
          "screen and (max-width: 640px)",
          {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }
        ]
      ],
      animation: {
        draw: function (data) {
          if (data.type === "bar") {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * delays2,
                dur: durations2,
                from: 0,
                to: 1,
                easing: "ease"
              }
            });
          }
        }
      }
    };
  }

  advertisementChart() {
    var delays = 80, durations = 500;
    const { company } = this.props;
    var labels = []
    for (let i = 0; i < 12; i++) {
      labels[11 - i] = moment().subtract(i, "month").format('MMMM').substring(0, 3);
    }

    var series = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    company.advertisements.forEach(ad => {
      var month = moment().month(ad.publishDate.split('-')[1] - 1).format('MMM');
      var idx = labels.indexOf(month);
      series[idx]++;
    });

    var largestMonth = 0;
    series.forEach(month => {
      if (month > largestMonth) {
        largestMonth = month
      }
    })

    return {
      data: {
        labels,
        series: [series]
      },
      options: {
        lineSmooth: Chartist.Interpolation.cardinal({
          tension: 0
        }),
        low: 0,
        high: largestMonth * 2,
        chartPadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }
      },
      animation: {
        draw: function (data) {
          if (data.type === "line" || data.type === "area") {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path
                  .clone()
                  .scale(1, 0)
                  .translate(0, data.chartRect.height())
                  .stringify(),
                to: data.path.clone().stringify(),
                easing: Chartist.Svg.Easing.easeOutQuint
              }
            });
          } else if (data.type === "point") {
            data.element.animate({
              opacity: {
                begin: (data.index + 1) * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: "ease"
              }
            });
          }
        }
      }
    };
  }

  componentDidMount() {
    const { getStatistics } = this.props;
    getStatistics();
  }

  render() {
    const { classes, statistics, company } = this.props;

    var applicationsChart;
    var advertisementChart;
    if (company) {
      applicationsChart = this.applicationChart();
      advertisementChart = this.advertisementChart();
    }
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <GroupIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Active Users</p>
                <h3 className={classes.cardTitle}>
                  {statistics ? statistics.userCount : null}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <BusinessIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Enrolled Companies</p>
                <h3 className={classes.cardTitle}>
                  {statistics ? statistics.companyCount : null}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <AttachMoneyIcon />
                </CardIcon>
                <p className={classes.cardCategory}>Published Advertisements</p>
                <h3 className={classes.cardTitle}>
                  {statistics ? statistics.advertisementCount : null}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Your Applications</p>
                <h3 className={classes.cardTitle}>
                  {company ? company.applications.length : null}
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                {company ?
                  <ChartistGraph
                    className="ct-chart"
                    data={advertisementChart.data}
                    type="Line"
                    options={advertisementChart.options}
                    listener={advertisementChart.animation}
                  /> : null}
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Monthly Advertisements</h4>
                <p className={classes.cardCategory}>
                  Your companies recently published advertisements
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                {company ?
                  <ChartistGraph
                    className="ct-chart"
                    data={applicationsChart.data}
                    type="Bar"
                    options={applicationsChart.options}
                    responsiveOptions={applicationsChart.responsiveOptions}
                    listener={applicationsChart.animation}
                  /> : null}
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Applications</h4>
                <p className={classes.cardCategory}>Received applications during last year</p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <Update />
                  Just Updated
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
        </GridContainer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    company: state.company.company,
    statistics: state.company.statistics
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getStatistics: bindActionCreators(getStatistics.request, dispatch)
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Dashboard));