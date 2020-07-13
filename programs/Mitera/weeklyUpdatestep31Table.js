import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Form } from "react-bootstrap";
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

function createData(srNo, fname, lname, age, hours, gpa, emergency_contact) {
  return { srNo, fname, lname, age, hours, gpa, emergency_contact };
}

const rows = [
  createData("1", "John", "Doe", 24, 4.0, 2, 333),
  createData("2", "John", "Doe", 37, 4.3, 2, 333),
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto",
  },
  table: {
    // minWidth: 700,
  },
}));

const program23 = () => {};

export default function WeeklyUpdatestep31Table(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      {props.program_id === 2 || props.program_id === 3 ? (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <StyledTableCell align="center">Attended</StyledTableCell> */}
              <StyledTableCell align="center">Attendent</StyledTableCell>
              <StyledTableCell align="center">Behavior 1st</StyledTableCell>
              <StyledTableCell align="center">Behavior 2nd</StyledTableCell>
              <StyledTableCell align="center">Behavior 3rd</StyledTableCell>
              <StyledTableCell align="center">Bible Verse</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableData &&
              props.tableData.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">
                    <Form.Check
                      checked={
                        props.attended3Concat &&
                        props.attended3Concat.includes(row.childID)
                      }
                      onChange={(e) =>
                        props.onChangeTick(row.childID, "attendend")
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Form.Check
                      checked={
                        props.behaviorConcat &&
                        props.behaviorConcat.includes(row.childID)
                      }
                      onChange={(e) =>
                        props.onChangeTick(row.childID, "behavior1")
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Form.Check
                      checked={
                        props.behaviortwoConcat &&
                        props.behaviortwoConcat.includes(row.childID)
                      }
                      onChange={(e) =>
                        props.onChangeTick(row.childID, "behavior2")
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Form.Check
                      checked={
                        props.behaviorthreeConcat &&
                        props.behaviorthreeConcat.includes(row.childID)
                      }
                      onChange={(e) =>
                        props.onChangeTick(row.childID, "behavior3")
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Form.Check
                      checked={
                        props.verseConcat &&
                        props.verseConcat.includes(row.childID)
                      }
                      onChange={(e) => props.onChangeTick(row.childID, "verse")}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.firstName ? row.firstName : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.lastName ? row.lastName : "-"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <StyledTableCell align="center">Attended</StyledTableCell> */}
              <StyledTableCell align="center">Attendent</StyledTableCell>
              <StyledTableCell align="center">Great Behavior</StyledTableCell>
              <StyledTableCell align="center">Bible Verse</StyledTableCell>
              <StyledTableCell align="center">First Name</StyledTableCell>
              <StyledTableCell align="center">Last Name</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.tableData &&
              props.tableData.map((row, i) => (
                <StyledTableRow key={i}>
                  <StyledTableCell align="center">
                    <Form.Check
                      checked={
                        props.attended3Concat &&
                        props.attended3Concat.includes(row.childID)
                      }
                      onChange={(e) =>
                        props.onChangeTick(row.childID, "attendend")
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Form.Check
                      checked={
                        props.behaviorConcat &&
                        props.behaviorConcat.includes(row.childID)
                      }
                      onChange={(e) =>
                        props.onChangeTick(row.childID, "behaviour")
                      }
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Form.Check
                      checked={
                        props.verseConcat &&
                        props.verseConcat.includes(row.childID)
                      }
                      onChange={(e) => props.onChangeTick(row.childID, "verse")}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.firstName ? row.firstName : "-"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.lastName ? row.lastName : "-"}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
}
