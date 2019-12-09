import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from '@material-ui/core/TableSortLabel';


const useStyles = makeStyles(theme => ({
    ...styles,
    root: {
        width: '100%',
        height: 45
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: 24,
        paddingRight: 24,
        height: '100%'

    },
    cell: {
        textTransform: 'capitalize',
        color: 'rgba(31, 193, 213)',
        fontWeight: 'bold',
        padding: 0,
        paddingTop: 13,
        textAlign: 'left',
        height: 'inherit',
        width: '16.6667%'
    },
    disabled: {
        backgroundColor: 'rgba(198, 198, 198, 0.5) !important',
        height: '100%'
    }
}));


function EnhancedTableHead(props) {
    const { classes, order, orderBy, headCells, onRequestSort } = props;

    const createSortHandler = property => event => {
        onRequestSort(event, property);
    };
    debugger;
    return (
        <TableRow classes={{ root: classes.row }}>
            {headCells.map(headCell => (
                <TableCell
                    key={headCell.id}
                    align={'left'}
                    padding={'default'}
                    sortDirection={orderBy === headCell.id ? order : false}
                    classes={{ root: classes.cell }}
                >
                    <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={order}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.label}

                    </TableSortLabel>
                </TableCell>
            ))}
            <div style={{ width: 48 }} />
        </TableRow>
    );
}

export default function Header(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <ExpansionPanel
                disabled={true}
                classes={{ disabled: classes.disabled }}>
                <EnhancedTableHead {...props} classes={classes} />
            </ExpansionPanel>
        </div>
    );
}