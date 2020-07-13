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
  TableBody,  IconButton,

} from "@material-ui/core";
import {withRouter } from 'react-router-dom'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { callApi } from "../../../crud/auth.crud";
import swal from "sweetalert";



class MentorSetupTable extends Component {

  deleteSubject=async(mentor_id,program_id)=>{
    const {date_id}=this.props;
    try {
      const result = await callApi("delete-mentor-to-program",{program_id,date_id,mentor_id})
      if (result.status === 200) {
        swal("Mentor Deleted Successfully!","", "success");
        await this.props.initializePage()
        await  this.props.getData();
      }
      else{
        swal("Oops!", "Please try again!!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!!", "error");
    }
  }
  deleteHandlerConfirm=(mentor_id,program_id)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.deleteSubject(mentor_id,program_id)
      } 
    });
  }
    
    render() {
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
                          {/* <TableCell>S No</TableCell> */}
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Program</TableCell>
                            <TableCell></TableCell>
                            {/* <TableCell align="right">Fat&nbsp;(g)</TableCell>
                              <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                              <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {tableData && tableData.length>0 ? tableData.map(row => (
                            <TableRow key={row.id}>
                              <TableCell>{row.firstName}</TableCell>
                              <TableCell>{row.lastName}</TableCell>
                              <TableCell>{row.age}</TableCell>
                              <TableCell>
                                {row.session}
                              </TableCell>
                              <TableCell>
                              <IconButton aria-label="Delete" onClick={()=>this.deleteHandlerConfirm(row.mentorID,row.programID)}>
        <DeleteOutlineIcon style={{color:"red"}}/>
      </IconButton>
                              </TableCell>
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

export default withRouter(MentorSetupTable)


