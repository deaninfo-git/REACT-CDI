
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
const   onChangeHandle=()=>{

}
export default function ChangeDateTable(props) {
    const classes = useStyles();
 
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <StyledTableCell  align="center">Attendent</StyledTableCell>
                        <StyledTableCell  align="center">Behaviour</StyledTableCell>
                        <StyledTableCell  align="center">Bible Verse</StyledTableCell>
                        <StyledTableCell  align="center">First Name</StyledTableCell>
                        <StyledTableCell  align="center">Last Name</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.tableData &&  props.tableData.map((row,i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell  align="center">
                            <Form.Check  checked={row.attended === "checked" ? true : false } onChange={onChangeHandle}/>
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                            <Form.Check checked={row.behavior === "checked" ? true : false } onChange={onChangeHandle} />
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                            <Form.Check checked={row.verse === "checked" ? true : false } onChange={onChangeHandle} />
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                              {row.first_name}
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                               {row.last_name}
                            </StyledTableCell>
                         </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}
