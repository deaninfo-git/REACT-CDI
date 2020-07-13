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
import { Badge } from "react-bootstrap";
import {withRouter } from 'react-router-dom'
import './programs.css'




class ScoreboardTable extends Component {

  seeProfile = (name, id) => {
    this.props.history.push({
      pathname: "/profileInfo",
      search: "?" + name,
      state: { childId: id },
    });
    // this.props.history.push("/profileInfo?"+name);
  };
    render() {
          const {tableData}=this.props
        console.log('this',this.props)
        return (
            <>
            {/* <Container style={maxWidth}> */}
      
            <div className="row">
              <div className="col-md-12">
                {/* <CodeExample> */}
                <div className="kt-section">
                  <div className="kt-section__content">
                    <Paper >
                      <Table >
                        <TableHead>
                          <TableRow>
                            <TableCell>Tutor Minutes</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData && tableData.length >0 ? tableData.map(row => (
                            <TableRow key={row.childID}>
                              <TableCell>{row.tutortime}</TableCell>
                              <TableCell>{row.firstName}</TableCell>
                              <TableCell>{row.lastName}</TableCell>
                              <TableCell>
                                <Badge pill variant="primary" className="BadgeStyle"
                                 onClick={() => this.seeProfile("seeProfile", row.childID)}>
                                  See Profile
                                </Badge>
                              </TableCell>
                            </TableRow>
                          )) : <p>No Data</p>}
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

export default withRouter(ScoreboardTable)


