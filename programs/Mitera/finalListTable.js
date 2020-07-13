
import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

export default function FinalListTable(props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {/* <StyledTableCell align="center">Attended</StyledTableCell> */}
                        <StyledTableCell  align="center">Date</StyledTableCell>
                        <StyledTableCell  align="center">{getItem('progName').id===15? "Adults" : "Kids"}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData &&  props.tableData.map((row,i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell  align="center">
                            {row.date ? row.date : "-"}
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                            {row.kids ? row.kids : "-"}
                            </StyledTableCell>
                         </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
