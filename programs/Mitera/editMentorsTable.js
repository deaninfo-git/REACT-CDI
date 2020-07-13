
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
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

function removeDuplicates(arr) {
  var i, tmp;
  for (i = 0; i < arr.length; i++) {
    tmp = arr.lastIndexOf(arr[i]);
    if (tmp === i) {
      //Only one of this number
    } else {
      //More than one
      arr.splice(tmp, 1);
      arr.splice(i, 1);
    }
  }
}



export default class EditMentorTable extends Component {

 
    render() {
        console.log('chekc new edit ',this.props)
        return (
            <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        {/* <StyledTableCell align="center">Attended</StyledTableCell> */}
                        <StyledTableCell  align="center">Attendent</StyledTableCell>
                        <StyledTableCell  align="center">Mentor First Name</StyledTableCell>
                        <StyledTableCell  align="center">Mentor Last Name</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.props.tableData &&  this.props.tableData.map((row,i) => (
                        <StyledTableRow key={i}>
                            <StyledTableCell  align="center">
                            <Form.Check 
                              defaultChecked={this.props.checked_mentor.includes(row.mentorID)? true:false}
                              onChange={()=>this.props.onChangeHandle(row.mentorID)}
                            />
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                            {row.firstName ? row.firstName : "-"}
                            </StyledTableCell>
                            <StyledTableCell  align="center">
                            {row.lastName ? row.lastName : "-"}
                            </StyledTableCell>
                         </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
        )
    }
}


