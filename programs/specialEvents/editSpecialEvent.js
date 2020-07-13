import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
// import Button from "@material-ui/core/Button";
import { Button, Form, InputGroup, Container, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {updateSpecialEvent} from '../../../crud/auth.crud'
import swal from "sweetalert";

const paper = {
  position: "absolute",
  width: 400,
  backgroundColor: "#fff",
  boxShadow: 5,
  padding: 25,
  outline: "none",
  top: `50%`,
  left: `50%`,
  transform: `translate(-50%, -50%)`,
};

function convert(str) {
  var date = new Date(str),
    mnth = ("0" + (date.getMonth() + 1)).slice(-2),
    day = ("0" + date.getDate()).slice(-2);
  return [date.getFullYear(), mnth, day].join("-");
}

const btnColor = {
    backgroundColor: "#f4b53f",
    border: "none",
  };
  
  const Hours = [
    "0.50",
    "1.00",
    "1.50",
    "2.00",
    "2.50",
    "3.00",
    "3.50",
    "4.00",
    "4.50",
    "5.00",
    "5.50",
    "6.00",
    "7.00",
    "8.00",
    "9.00",
    "10.0",
    "11.0",
    "12.0",
  ];
export default class EditSpecialEvent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,start_date:props.editData.startDate ? new Date(props.editData.startDate) : new Date(),
      end_date:props.editData.endDate? new Date(props.editData.endDate) : new Date(),name:props.editData.program,
      leader:props.editData.leader,hours:props.editData.hours,
      program_id:props.editData.programID
    };
  }

  setStartDate = (date) => {
    console.log("date", date);
    this.setState({ start_date: date });
  };

  setEndDate = (date) => {
    console.log("date", date);
    this.setState({ end_date: date });
  };

  onChangeHandle = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  callbacks = () => {
    this.props.handleClose();
    this.props.getEvents()
  };

  handleSubmit = async (e) => {
    e.preventDefault();
   try{
      const {  name, start_date, end_date, leader, hours, program_id} = this.state;
    let result = await updateSpecialEvent(
      name,
     convert(start_date),
     convert(end_date),
     leader,hours,
     program_id
    );
    console.log("result of add", result);
    if (result.status === 200) {
      swal("Special Events updated Successfully!", "", "success");
      // this.setState(emptyState,this.callbacks)
      this.callbacks()
    
    } else {
      swal("Oops!", "Please try again!", "error");
    }
  }
  catch(err){
    if(err && err.data && err.data.date.message){
      swal("Oops!", err.data.date.message, "");
    }
    else{
      swal("Oops!", "Network Error!", "error");
    }
  }
  };

  render() {
    const { start_date,end_date,name,leader,hours } = this.state;
    console.log('hello state',this.props)
    return (
      <div>
        {/* <Typography gutterBottom>
          Click to get the full Modal experience!
        </Typography> */}
        {/* <Button onClick={this.props.handleOpen}>Open Modal</Button> */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <div style={paper}>
              <div className="d-flex justify-content-between">
                   <span>   <Typography variant="h6" id="modal-title">
              Edit a Special Event
            </Typography></span>
                   <span> <i class="fas fa-times" onClick={this.props.handleClose}></i></span>
              </div>
         
          
            <Form className="mt-4" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Name a Special Event</Form.Label>
                <Form.Control type="text" 
               required
               name="name"
               value={name}
               onChange={this.onChangeHandle}
                placeholder="Enter Name" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Start Date</Form.Label>
                <div>  <DatePicker
                          selected={start_date}
                          selectsStart
                          startDate={start_date}
                          endDate={end_date}
                          placeholderText="Start Date"
                          className="form-control dateWidth"
                          onChange={(date) => this.setStartDate(date)}
                          fullWidth
                          // maxDate={new Date(this.props.editData.start_date)}
                        />
                        </div>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>End Date</Form.Label>
                <div> 
                 <DatePicker
                          selected={end_date}
                          selectsEnd
                          startDate={start_date}
                          // endDate={new Date(this.props.editData.end_date)}
                          // minDate={new Date(this.props.editData.start_date)}
                           minDate={start_date}
                          onChange={(date) => this.setEndDate(date)}
                          placeholderText="End Date"
                          className="form-control dateWidth"
                          disabled={start_date ? false : true}
                        /></div>
              </Form.Group>
              <Form.Group>
                <Form.Label>Leader</Form.Label>
                <Form.Control as="textarea" rows="3" required
                 name="leader"
                 value={leader}
                 onChange={this.onChangeHandle}
                placeholder="Leader" />
              </Form.Group>
              <Form.Group >
                    <Form.Label>
                      Time Monitoring Per Child
                    </Form.Label>
                    <Form.Control as="select"  name="hours" required
                 defaultValue={hours}
                 onChange={this.onChangeHandle}>
                  <option value="">Hours</option>
                  {Hours.map((el, i) => (
                    <option key={i} value={el}>
                      {el}&nbsp;Hours
                    </option>
                  ))}
                </Form.Control>
                  </Form.Group>
                  <div className="text-center">
                  <Button type="submit" style={btnColor}>
                       Update Special Event
                      </Button>
                  </div>
                
            </Form>

            {/* <AddSpecialEvent /> */}
          </div>
        </Modal>
      </div>
    );
  }
}
