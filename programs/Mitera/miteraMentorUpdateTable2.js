
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {   
    Form,} from "react-bootstrap";
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


function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }



export default class MiteraMentorUpdateTable2 extends Component {



    renderDataWithAllBehavior=()=>{
        return  <Table>
        <TableHead>
            <TableRow>
                <StyledTableCell  align="center">Attendent</StyledTableCell>
                <StyledTableCell  align="center">Behavior 1</StyledTableCell>
                <StyledTableCell  align="center">Behavior 2</StyledTableCell>
                <StyledTableCell  align="center">Behavior 3</StyledTableCell>
                <StyledTableCell  align="center">Verse</StyledTableCell>
                <StyledTableCell  align="center">Name</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {this.props.tableData &&  this.props.tableData.map((row,i) => (
                <StyledTableRow key={i}>
                    <StyledTableCell  align="center">
                    <Form.Check checked={this.props.attended.includes(row.attended)? true:false}
                              onChange={()=>this.props.onChangeHandleAttended(row.attended)}/>
                    </StyledTableCell>
                    <StyledTableCell  align="center">
                    <Form.Check checked={this.props.behavior.includes(row.attended)? true:false}
                              onChange={()=>this.props.onChangeHandleBehavior(row.attended,"one")}/>
                    </StyledTableCell>
                    <StyledTableCell  align="center">
                    <Form.Check checked={this.props.behavior2.includes(row.attended)? true:false}
                              onChange={()=>this.props.onChangeHandleBehavior(row.attended,"two")}/>
                    </StyledTableCell>
                    <StyledTableCell  align="center">
                    <Form.Check checked={this.props.behavior3.includes(row.attended)? true:false}
                              onChange={()=>this.props.onChangeHandleBehavior(row.attended,"three")}/>
                    </StyledTableCell>
                    <StyledTableCell  align="center">
                    <Form.Check checked={this.props.verse.includes(row.attended)? true:false}
                              onChange={()=>this.props.onChangeHandleVerse(row.attended)}/>
                    </StyledTableCell>
                    <StyledTableCell  align="center">
                    {row.first_name ? row.first_name +" "+ row.last_name: "-"}
                    </StyledTableCell>
                 </StyledTableRow>
            ))}
        </TableBody>
    </Table>
    }
    
    renderDataWithOneBehavior=()=>{
     return    <Table>
        <TableHead>
            <TableRow>
                <StyledTableCell  align="center">Attendent</StyledTableCell>
                <StyledTableCell  align="center">Behavior</StyledTableCell>
                <StyledTableCell  align="center">Verse</StyledTableCell>
                <StyledTableCell  align="center">First Name</StyledTableCell>
                <StyledTableCell  align="center">Last Name</StyledTableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {this.props.tableData &&  this.props.tableData.map((row,i) => (
                <StyledTableRow key={i}>
                    <StyledTableCell  align="center">
                    <Form.Check   checked={this.props.attended.includes(row.attended)? true:false}
                              onChange={()=>this.props.onChangeHandleAttended(row.attended)}/>
                    </StyledTableCell> 
                    <StyledTableCell  align="center">
                    <Form.Check checked={this.props.behavior.includes(row.attended)? true:false}
                              onChange={()=>this.props.onChangeHandleBehavior(row.attended,"one")}/>
                    </StyledTableCell>
                    <StyledTableCell  align="center">
                    <Form.Check checked={this.props.verse.includes(row.attended)? true:false}
                              onChange={()=>this.props.onChangeHandleVerse(row.attended)}/>
                    </StyledTableCell>
                    <StyledTableCell  align="center">
                    {row.first_name ? row.first_name : "-"}
                    </StyledTableCell>
                    <StyledTableCell  align="center">
                    {row.last_name ? row.last_name : "-"}
                    </StyledTableCell>
                 </StyledTableRow>
            ))}
        </TableBody>
    </Table>
    }


    render() {
        return (
            <Paper className={getItem('progName').id === 3 ? "" : "ml-5"} >
            {getItem('progName').id === 3 ? this.renderDataWithAllBehavior() : this.renderDataWithOneBehavior()}
        </Paper>
        )
    }
}

