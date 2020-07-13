import React, { Component } from 'react'
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {withRouter} from 'react-router-dom';



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



 class AddedToCDI extends Component {
    
    render() {
           let payload= this.props.location.state ? this.props.location.state : "" ;
        return (
          <div className="col-md-8">
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Kid Power Activity Update</h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content d-flex">
                      <span className="font-weight-bold">Total Tutored Minutes :</span>
                      <span className="px-2">{payload && payload.total_min ? payload.total_min : "-"}</span>
                    </div>
                      <div className="kt-section__content py-4">
                      <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>First Name</StyledTableCell>
                  <StyledTableCell>Last Name</StyledTableCell>
                  <StyledTableCell>Mentor First Name</StyledTableCell>
                  <StyledTableCell>Mentor Last Name</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {payload.data && payload.data.map((row,i) => (
                  <StyledTableRow key={i}>
                    <StyledTableCell>{row.firstName}</StyledTableCell>
                    <StyledTableCell>{row.lastName}</StyledTableCell>
                    <StyledTableCell>{row.mentor_firstname}</StyledTableCell>
                    <StyledTableCell>{row.mentor_lastname}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
                       
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
        )
    }
}

export default withRouter(AddedToCDI)


