import React, { Component } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Pagination from "react-js-pagination";
import { IconButton } from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { callApi } from "../../../crud/auth.crud";
import swal from "sweetalert";
import {withRouter} from 'react-router-dom'

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

const expandColor = {
  backgroundColor: "#f3a002",
  color: "#fff",
};

const cursorStyle={
  cursor:"grab",
  fontWeight:"bold",
  title:"hell"
}

 class ChildConfigTable extends Component {

  addMentor=async(child_id)=>{
    const {mentor_id,program_id}=this.props;
    try {
      const result = await callApi("child-to-mentor-assign",{mentor_id, child_id, program_id})
      if (result.status === 200) {
        swal("Child Added Successfully!","", "success");
        await  this.props.getChildToMentor();
        await this.props.getChildToMentorEligible()
      }
      else{
        swal("Oops!", "Please try again!!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!!", "error");
    }
  }

  deleteMentor=async(child_id)=>{
    const {mentor_id,program_id}=this.props;
    try {
      const result = await callApi("child-to-mentor-delete",{mentor_id, child_id, program_id})
      if (result.status === 200) {
        swal("Mentor Deleted Successfully!","", "success");
        await  this.props.getChildToMentor();
      }
      else{
        swal("Oops!", "Please try again!!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!!", "error");
    }
  }
  deleteHandlerConfirm=(child_id)=>{
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this.deleteMentor(child_id)
      } 
    });
  }
    
  handlePageChange = (pageNumber) => {
    this.props.changePage(pageNumber);
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.current_page !== this.props.current_page) {
      this.props.getChildToMentorEligible();
    }
  }

  seeProfile = (name, id) => {
    this.props.history.push({
      pathname: "/profileInfo",
      search: "?" + name,
      state: { childId: id },
    });
    // this.props.history.push("/profileInfo?"+name);
  };

  render() {
    const {
      currently_data,
      previously_data,
      mentor_name,
      eligible_data,
      program_name,
    } = this.props;
    console.log('thisprops',this.props)
    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>First Name</StyledTableCell>
              <StyledTableCell>Last Name</StyledTableCell>
              <StyledTableCell>Grade </StyledTableCell>
              <StyledTableCell> </StyledTableCell>
              <StyledTableCell> </StyledTableCell>
            </TableRow>
          </TableHead>
        </Table>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={expandColor}
          >
            <Typography>kids currently assigned to {mentor_name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <TableHead></TableHead>
              <TableBody>
                {currently_data &&
                  currently_data.map((row, i) => (
                    <StyledTableRow key={row.child_id}>
                      <StyledTableCell component="th" scope="row">
                        {row.first_name}
                      </StyledTableCell>
                      <StyledTableCell>{row.last_name}</StyledTableCell>
                      <StyledTableCell>{row.grade}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          aria-label="Delete"
                          onClick={() =>
                            this.deleteHandlerConfirm(row.child_id)
                          }
                        >
                          <DeleteOutlineIcon style={{ color: "red" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={expandColor}
          >
            <Typography>kids previously assigned to {mentor_name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <TableHead></TableHead>
              <TableBody>
                {previously_data &&
                  previously_data.map((row, i) => (
                    <StyledTableRow key={row.child_id}>
                      <StyledTableCell component="th" scope="row" 
                        style={cursorStyle} 
                        onClick={() => this.seeProfile("seeProfile", row.child_id)}>
                        {row.first_name}
                      </StyledTableCell>
                      <StyledTableCell>{row.last_name}</StyledTableCell>
                      <StyledTableCell>{row.grade}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          aria-label="Delete"
                          title={`Add to ${mentor_name} list`}
                          onClick={() =>
                            this.addMentor(
                              row.child_id
                            )
                          }
                        >
                          <AddCircleOutlineIcon style={{ color: "green" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            style={expandColor}
          >
            <Typography>kids eligible for {program_name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Table>
              <TableHead></TableHead>
              <TableBody>
                {eligible_data &&
                  eligible_data.map((row, i) => (
                    <StyledTableRow key={row.childID}>
                      <StyledTableCell component="th" scope="row"  style={cursorStyle} 
                        onClick={() => this.seeProfile("seeProfile", row.childID)}>
                        {row.firstName}
                      </StyledTableCell>
                      <StyledTableCell>{row.lastName}</StyledTableCell>
                      <StyledTableCell>{row.grade}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          aria-label="Delete"
                          title={`Add to ${mentor_name} list`}
                          onClick={() =>
                            this.addMentor(
                              row.childID
                            )
                          }
                        >
                          <AddCircleOutlineIcon style={{ color: "green" }} />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
          </ExpansionPanelDetails>
          <div className="text-center ml-4">
            {this.props.total > 10 ? (
              <Pagination
                activePage={this.props.current_page}
                itemsCountPerPage={10}
                totalItemsCount={this.props.total}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange.bind(this)}
                itemClass="page-item"
                linkClass="page-link"
              />
            ) : null}
          </div>
        </ExpansionPanel>
      </Paper>
    );
  }
}

export default withRouter(ChildConfigTable)
