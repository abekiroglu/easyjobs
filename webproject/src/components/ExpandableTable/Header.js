import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    ...styles,
    root: {
        width: '100%',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cell: {
        width: '20%',
        textTransform: 'capitalize',
        color: 'rgba(31, 193, 213)',
        fontWeight: 'bold'
    },
    disabled: {
        backgroundColor: 'rgba(198, 198, 198, 0.5) !important'
    }
}));

function space(text) {
    var str = '';
    var length = text.length;
    var lastUpperCase = 0;
    var i;
    for (i = 0; i < length; i++) {
        if (text.charAt(i) === text.charAt(i).toUpperCase()) {
            str += text.substring(lastUpperCase, i) + ' ';
            lastUpperCase = i;
        }
        if (i == length - 1) {
            str += text.substring(lastUpperCase, i + 1)
        }
    }
    return str;
}

export default function Header(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <ExpansionPanel
                disabled={true}
                classes={{ disabled: classes.disabled }}>
                <ExpansionPanelSummary
                    expandIcon={<div style={{ width: 24 }} />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    classes={{ content: classes.content }}>
                    {props.data.map(title => {
                        return (
                            <div className={classes.cell}>
                                {space(title)}
                            </div>
                        );
                    })}

                </ExpansionPanelSummary>
            </ExpansionPanel>
        </div>
    );
}