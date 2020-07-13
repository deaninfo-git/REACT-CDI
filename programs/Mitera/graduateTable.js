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





class GraduateTable extends Component {

    // seeProfile=()=>{
    //     this.props.history.push("/profileInfo")
    // }
    render() {

        console.log('this',this.props)
        const {tableData}=this.props;
        return (
            <>
            {/* <Container style={maxWidth}> */}
      
            <div className="row">
              <div className="col-md-12">
                {/* <CodeExample> */}
                <div className="kt-section">
                  {/* <span className="kt-section__sub">
                      A simple example with no frills.
                    </span> */}
                  {/* <div className="kt-separator kt-separator--dashed"></div> */}
                  <div className="kt-section__content">
                    <Paper >
                      <Table >
                        <TableHead>
                          <TableRow>
                            <TableCell>S No</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData && tableData.length > 0? tableData.map((row,i) => (
                            <TableRow key={i}>
                              <TableCell>{i+1}</TableCell>
                              <TableCell>{row.childFirstName}</TableCell>
                              <TableCell>{row.childLastName}</TableCell>
                            </TableRow>
                          )): <p>No Data</p>}
                        </TableBody>
                      </Table>
                    </Paper>
                  </div>
                </div>
                {/* </CodeExample> */}
              </div>
            </div>
            {/* </Container> */}
          </>
        )
    }
}

export default withRouter(GraduateTable)


