import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import ExpandableRow from './ExpandableRow.js'
import Header from './Header.js'
const useStyles = makeStyles(styles);

export default function ExpandableTable(props) {
    const classes = useStyles();
    const { tableHead, tableData, tableHeaderColor, actions } = props;

    return (
        <div className={classes.tableResponsive}>
            <Header data={tableHead} />
            <ExpandableRow data={tableData} />
        </div>
    );
}

ExpandableTable.defaultProps = {
    tableHeaderColor: "gray"
};

ExpandableTable.propTypes = {
    tableHeaderColor: PropTypes.oneOf([
        "warning",
        "primary",
        "danger",
        "success",
        "info",
        "rose",
        "gray"
    ]),
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
