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



const rows = [
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Donut', 452, 25.0, 51, 4.9),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Honeycomb', 408, 3.2, 87, 6.5),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Jelly Bean', 375, 0.0, 94, 0.0),
    createData('KitKat', 518, 26.0, 65, 7.0),
    createData('Lollipop', 392, 0.2, 98, 0.0),
    createData('Marshmallow', 318, 0, 81, 2.0),
    createData('Nougat', 360, 19.0, 9, 37.0),
    createData('Oreo', 437, 18.0, 63, 4.0),
];

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

function stableSort(array, cmp) {
    debugger;
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
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
    const [rowsPerPage, setRowsPerPage] = React.useState(1);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('id');
    const [expanded, setExpanded] = React.useState(false);


    const handleRequestSort = (event, property) => {
        const isDesc = orderBy === property && order === 'desc';
        debugger;
        setOrder(isDesc ? 'asc' : 'desc');
        setOrderBy(property);
        setExpanded(false);
        setPage(0);
    };

    const handleChangePage = (event, newPage) => {
        debugger;
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChange = panel => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.tableResponsive}>
            <Header
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
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
                                    {<ExpandableRow data={row} />}
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <props.tableBody data={row} />
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        );
                    })}
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
                rowsPerPageOptions={[1, 2, 3]}
                component="div"
                count={44}
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
