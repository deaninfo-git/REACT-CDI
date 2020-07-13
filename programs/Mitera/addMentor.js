import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
// import Button from "@material-ui/core/Button";
import { Button, Form } from "react-bootstrap";
import {callApi} from '../../../crud/auth.crud'
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

const btnColor = {
    backgroundColor: "#f4b53f",
    border: "none",
  };
  

export default class AddMentor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessionId:this.props.sessions[0].dateID,
      mentors:[],mentorId:"",age:"21 or over"
    };
  }

   async componentDidMount() {
     await this.getAllMentors();
   }
   
   addMentor=async(e)=>{
     e.preventDefault();
     const{sessionId,mentorId,age}=this.state;
    const {program_id}=this.props;
    try {
      let result = await callApi("add-mentor-to-program",{program_id,date_id:sessionId,mentor_id:mentorId,
         age});
      if (result.status === 200) {
        swal("Mentor Added successfully","","success")
        this.props.handleClose()
        this.props.getData()
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
   }

  getAllMentors = async () => {
    const{sessionId}=this.state;
    const {program_id}=this.props;
    try {
      let result = await callApi("mentors-list",{ program_id,date_id:sessionId});
      if (result.status === 200) {
        this.setState(
          {
            mentors: result.data.data,
            mentorId:result.data.data[0].id
          }
        );
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };


  onChangeHandle=(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  render() {
    const { sessionId,mentors,mentorId } = this.state;
    const {sessions}=this.props;
    console.log('this.state',this.state)
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
              Add a Mentor
            </Typography></span>
                   <span> <i class="fas fa-times" onClick={this.props.handleClose}></i></span>
              </div>
         
          
            <Form className="mt-4"
            onSubmit={this.addMentor}
            >
              <Form.Group >
                <Form.Label>Mentor Name</Form.Label>
                <Form.Control as="select" name="mentorId" onChange={this.onChangeHandle}
                      value={mentorId}
                      >
                        {
                     mentors && mentors.length >0 ?     mentors && mentors.map((el)=>
                           <option  key={el.id} value={el.id}>{el.firstName+" "+el.lastName}</option> 
                          )
                       : <option>Loading Mentors....</option> }
                      </Form.Control>
              </Form.Group>
              {/* <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Last Name" />
              </Form.Group> */}
              <Form.Group >
                    <Form.Label>
                     Age
                    </Form.Label>
                      <Form.Control as="select" name="age" onChange={this.onChangeHandle}>
                        <option value="21 or over">21 year or over</option>
                        <option value="Under 21">Under 21</option>
                      </Form.Control>
                  </Form.Group>
                  <Form.Group >
                    <Form.Label>
                     Which Session should this to be applied?
                    </Form.Label>
                      <Form.Control as="select" name="sessionId" onChange={this.onChangeHandle}
                      value={sessionId}
                      >
                        {
                          sessions && sessions.map((el)=>
                           <option  key={el.dateID} value={el.dateID}>{el.dateName}</option> 
                          )
                        }
                      </Form.Control>
                  </Form.Group>
                  <div className="text-center">
                  <Button type="submit" style={btnColor}>
                        Add Mentor to CDI
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
