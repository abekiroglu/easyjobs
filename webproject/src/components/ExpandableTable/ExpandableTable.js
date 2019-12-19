import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import ExpandableRow from './ExpandableTableBody.js'
import Header from './Header.js'
import TablePagination from '@material-ui/core/TablePagination';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';

const useStyles = makeStyles(theme => ({
    ...styles,
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    content: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    cell: {
        width: '16.6%'
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    }
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

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
        if (i === length - 1) {
            str += text.substring(lastUpperCase, i + 1)
        }
    }
    return str;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0].header, b[0].header);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export default function ExpandableTable(props) {
    const classes = useStyles();
    const { tableHead, tableData } = props;


    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [expanded, setExpanded] = React.useState(false);


    const handleRequestSort = (event, property, setSort) => {
        const isDesc = orderBy === property && order === 'desc';
        setSort(property, isDesc ? 'asc' : 'desc');
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
        setExpanded(false);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const { setSort } = props;

    return (

        <div className={classes.tableResponsive}>
            <Header
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={(e, p) => handleRequestSort(e, p, setSort)}
                headCells={tableHead.map(data => {
                    return { id: data, label: space(data) }
                })}
            />
            <div className={classes.root}>
                {stableSort(tableData, getSorting(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                        return (
                            <ExpansionPanel expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1bh-content"
                                    id="panel1bh-header"
                                    classes={{ content: classes.content }}
                                >
                                    {<ExpandableRow data={row.header} />}
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <props.tableBody data={row} />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        );
                    })}
                {/* {...props.bodyArgs} removed from prop.tablebody component */}
                {/* {tableData.map((prop, index) => {
                    return (
                        <ExpansionPanel expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1bh-content"
                                id="panel1bh-header"
                                classes={{ content: classes.content }}
                            >
                                {<ExpandableRow data={prop} />}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <props.tableBody data={tableData[index]} />
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    );
                })} */}
            </div>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={tableData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
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
    tableHead: PropTypes.arrayOf(PropTypes.string)
};
