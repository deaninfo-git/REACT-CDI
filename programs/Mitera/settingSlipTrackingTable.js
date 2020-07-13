import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {Form} from "react-bootstrap";

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

export default function SettingSlipTrackingTable(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {/* <StyledTableCell align="center">Permission Slip</StyledTableCell> */}
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>Permission Slip</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.tableData &&
            props.tableData.map((row, i) => (
              <StyledTableRow key={i}>
                <StyledTableCell>{row.first_name}</StyledTableCell>
                <StyledTableCell>{row.last_name}</StyledTableCell>
                <StyledTableCell>
                  <Form.Check
                    checked={
                      props.child_id_arr.includes(row.child_id)
                        ? true
                        : false
                    }
                    onChange={() => props.onChangeHandle(row.child_id)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </Paper>
  );
}
