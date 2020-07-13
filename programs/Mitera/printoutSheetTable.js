import React, { Component } from 'react'
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper"
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const fontStyle={fontSize:'10px'}

export default class PrintoutSheetTable extends Component {
    
    render() {
       const {data}=this.props
        return (
            <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Grade</StyledTableCell>
                  <StyledTableCell>Birthday</StyledTableCell>
                  <StyledTableCell>Last Session</StyledTableCell>
                  <StyledTableCell>Tonight</StyledTableCell>
                  <StyledTableCell>Semester Score</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { data && data.length > 0 ? data.map((el,i)=>
                 <StyledTableRow >
                 <StyledTableCell style={fontStyle}>{el.firstName+" "+el.lastName}</StyledTableCell>
                 <StyledTableCell  style={fontStyle}>{el.grade}</StyledTableCell>
                 <StyledTableCell  style={fontStyle}>{el.dateOfBirth}</StyledTableCell>
                 <StyledTableCell  style={fontStyle}>{"("+el.last_session+")"}
                    <div>
                        <span>Behavior :</span>
                        <span>{el.behavior}</span>
                    </div>
                    {/* <div>
                        <span>Attendance :</span>
                        <span>0</span>
                    </div> */}
                 </StyledTableCell>
                 <StyledTableCell  style={fontStyle}>2010-10-22</StyledTableCell>
                 <StyledTableCell  style={fontStyle}>{el.totalpoints}</StyledTableCell>
               </StyledTableRow>
                )  : <p>No Data</p>}
             
              </TableBody>
            </Table>
          </Paper>
        )
    }
}


