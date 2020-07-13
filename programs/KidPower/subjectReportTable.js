/* eslint-disable jsx-a11y/anchor-has-content,no-script-url,jsx-a11y/anchor-is-valid */
//import { toAbsoluteUrl } from "../../_metronic/utils/utils";
//import PortletHeaderDropdown from "../partials/content/CustomDropdowns/PortletHeaderDropdown";
import React, { Component } from 'react'
import {
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import {withRouter } from 'react-router-dom'





class SubjectReportTable extends Component {

  showDetails=(program_id,id)=>{
    this.props.push({
      pathname: '/programs/subject-reports-details',
      state: {program_id:program_id,child_id:id }
    })
  }
  
    render() {
        const {tableData}=this.props;
        return (
            <>      
            <div className="row">
              <div className="col-md-12">
                <div className="kt-section">
                  <div className="kt-section__content">
                    <Paper >
                      <Table >
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Birth Date</TableCell>
                            <TableCell>Ethnicity</TableCell>
                            <TableCell>Grade</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Detail</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData && tableData.length > 0? tableData.map((row,i) => (
                            <TableRow key={i}>
                              <TableCell>{row.firstName+" "+row.lastName}</TableCell>
                              <TableCell>{row.dateOfBirth}</TableCell>
                              <TableCell>{row.ethinicity}</TableCell>
                              <TableCell>{row.grade}</TableCell>
                              <TableCell>{row.city}</TableCell>
                              <TableCell><i
                            className="flaticon-eye kt-font-warning detailIcon"
                            title="View Detail"
                            onClick={() =>this.showDetails(row.programID,row.childID)}
                          /></TableCell>
                            </TableRow>
                          )): <p>No Data</p>}
                        </TableBody>
                      </Table>
                    </Paper>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
    }
}

export default withRouter(SubjectReportTable)


