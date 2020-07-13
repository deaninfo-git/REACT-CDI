
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button } from "@material-ui/core";
import {Form} from "react-bootstrap";
import {updateAttendance} from '../../../crud/auth.crud'
import swal from "sweetalert";

    
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

const btnColor = {
    backgroundColor: "#f4b53f",
    border: "none",
    color: "#fff",
  };

  

export default class AttendanceRPMTAble extends Component {

constructor(props) {
    super(props)
    this.state = {
         childID_Array:[]
    }
}

    onChangeHandle1=()=>{}
   

    updateHandle=async()=>{
        const{child_id_arr}=this.props;
        if(child_id_arr.length)
        try {
            const result = await updateAttendance(this.props.program_id,child_id_arr)
            if (result.status === 200) {
               swal("Successfully Updated!","", "success");
               this.props.attendanceList();
            }
            else{
              swal("Oops!", "Please try again!!", "error");
            }
          } catch {
            swal("Oops!", "Network Error!!", "error");
          }
    }


    render() {
        const {tableData}=this.props
        return (
            <Paper>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Attended</StyledTableCell>
                        <StyledTableCell>First Name</StyledTableCell>
                        <StyledTableCell>Last Name</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableData && tableData.map((row ,i)=> (
                        <StyledTableRow key={i}>
                            <StyledTableCell  align="center">
                           {/* {row.attendence ? */}
                           <Form.Check checked={this.props.child_id_arr.includes(row.childID)? true:false} onChange={()=>this.props.onChangeHandle(row.childID)}/> 
                           {/* : */}
                           {/* <Form.Check 
                              onChange={(e)=>this.onChangeHandle(e,row.childID)} />} */}
                            </StyledTableCell>
                            <StyledTableCell >{row.firstName}</StyledTableCell>
                            <StyledTableCell>{row.lastName}</StyledTableCell>
                         </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="text-center">
                <Button type="submit" style={btnColor} onClick={this.updateHandle} className="mt-4 mb-4">
                  Update
                </Button>
              </div>
        </Paper>
        )
    }
}


