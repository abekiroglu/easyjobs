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
        width: '20%'
    }
}));


export default function ExpandableRow(props) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    return (
        <div className={classes.root}>
            {Object.keys(props.data).map((key, index) => {
                let prop = props.data[key];
                return (
                    <ExpansionPanel expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            classes={{ content: classes.content }}
                        >
                            {Object.keys(prop).map((key, index) => {
                                let data = prop[key];
                                return (
                                    <div className={classes.cell}>
                                        {typeof data === 'boolean' ?
                                            data
                                                ? "True" : "False" :
                                            typeof data === 'object' ? data.id : data}
                                    </div>
                                );
                            })}
                        </ExpansionPanelSummary>

                        <ExpansionPanelDetails>
                            <Dashboard />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })}
        </div>
    );
}