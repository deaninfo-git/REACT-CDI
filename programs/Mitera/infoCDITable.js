
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {   
    Form,} from "react-bootstrap";
const StyledTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
}))(TableRow);

function createData(srNo, fname, lname, age, hours, gpa, emergency_contact) {
    return { srNo, fname, lname, age, hours, gpa, emergency_contact };
}

const rows = [
    createData('1', 'John', 'Doe', 24, 4.0, 2, 333),
    createData('2', 'John', 'Doe', 37, 4.3, 2, 333),
];

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(3),
        overflowX: 'auto',
    },
    table: {
        // minWidth: 700,
    },
}));

export default function InfoCDITAble(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {/* <StyledTableCell align="center">Attended</StyledTableCell> */}
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell>Last Name</StyledTableCell>
                        <StyledTableCell>Behaviour Points</StyledTableCell>
                        <StyledTableCell>Bible Poinst</StyledTableCell>
                        <StyledTableCell>Total Points</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData && props.tableData.map((row,i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell >{row.firstName}</StyledTableCell>
                            <StyledTableCell>{row.lastName}</StyledTableCell>
                            <StyledTableCell>{row.bpoints}</StyledTableCell>
                            <StyledTableCell>{row.vpoints}</StyledTableCell>
                            <StyledTableCell>{row.total}</StyledTableCell>
                         </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
