import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import Dashboard from "views/Dashboard/Dashboard.js"

const useStyles = makeStyles(theme => ({
    ...styles,
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cell: {
        width: '16.6%'
    }
}));


export default function ExpandableRow(props) {
    const classes = useStyles();
    const { data } = props;
    const [expanded, setExpanded] = React.useState(false);

    return Object.keys(data).map((key, index) => {
        let cell = data[key];
        return (
            <div className={classes.cell}>
                {typeof cell === 'boolean' ? cell ? "True" : "False" :
                    cell === null ? null :
                        Array.isArray(cell) ? cell.length :
                            typeof cell === 'object' ? cell.id :
                             cell}
            </div>
        )
    });

}