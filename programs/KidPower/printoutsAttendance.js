import React, { Component } from 'react'
import {
    Form,
    Col,
    Row,
    Container,
    Dropdown,
  } from "react-bootstrap";
  import { Button } from "@material-ui/core";
  import {
    fetchData
  } from "../../../crud/auth.crud";
  import swal from "sweetalert";
  import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

  const btnColor = {
    backgroundColor: "#f4b53f",
    border: "none",
    color: "#fff",
  };

  function convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }
export default class PrintoutsAttendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessions: [],
      sessionName: "",start_date: new Date(),
      end_date: new Date(),session_dateId:""
    };
  }


  async componentDidMount() {
    await this.getAllSessions();
  }

  getAllSessions = async () => {
    try {
      let result = await fetchData("session-semester");
      if (result.status === 200) {
        this.setState(
          {
            sessions: result.data.data,
            sessionName: result.data.data[0].dateName,
            session_dateId: result.data.data[0].dateID,
          }
        );
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };
  onChangeHandle = (e) => {
    let obj = JSON.parse(e);
    this.setState({ sessionName: obj.name, session_dateId: obj.id }
    );
  };

  setStartDate = (date) => {
    this.setState({ start_date: date });
  };

  setEndDate = (date) => {
    this.setState({ end_date: date });
  };

  onSubmitSheet=(e)=>{
    e.preventDefault();
     const {session_dateId,start_date,end_date}=this.state;
     if(session_dateId && start_date && end_date)
    this.props.push({
      pathname: '/programs/sheet',
      state: {
      // program_id:getItem('progName').id,
      program_id:2, /* it only works for primetime junior(id=2)*/
      session_id:session_dateId, 
      from_date:convert(start_date), 
      to_date:convert(end_date)}
    })
  }
    render() {
      const { sessions, sessionName,start_date,end_date} = this.state;
        return (
            <div className="col-md-8">
            {/* <div className="kt-section"> */}
            <>
              <div className="kt-portlet kt-portlet--height-fluid">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">Weekly Kid Power Attendance</h3>
                  </div>
                </div>
                <div className="kt-portlet__body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="kt-section">
                        <div className="kt-section__content">
                            <Container>
                            <Form.Row>
                                <Col md={4}>
                                
                            <span className="font-weight-bold">A-</span>
                            <span className="">
                             Student is Present
                            </span>
                      
                                </Col>
                                <Col md={4}>
                                
                            <span className="font-weight-bold">P-</span>
                            <span className="">
                             Student is Participating
                            </span>
                                </Col>
                                <Col md={4}>
                            <span className="font-weight-bold">B1-</span>
                            <span className="">
                             fair behaviour
                            </span>
                                </Col>
                                <Col md={4}>
                            <span className="font-weight-bold">B2-</span>
                            <span className="">
                             Good behaviour
                            </span>
                                </Col>
                                <Col md={4}>
                            <span className="font-weight-bold">B3-</span>
                            <span className="">
                             EXcellent Behaviour
                            </span>
                                </Col>
                            </Form.Row>
                            </Container>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="kt-section">
                        <div className="kt-section__content">
                        <Container style={{maxWidth:"400px"}}>
                        <Form onSubmit={this.onSubmitSheet}>
                  <Form.Group as={Row} controlId="formHorizontalEmail">
                    <span className="col-md-4">
                    Session Scorecard
                    </span>
                    <Col sm={8}>
                    <Dropdown onSelect={this.onChangeHandle}>
                            <Dropdown.Toggle
                              variant="warning"
                              id="dropdown-basic"
                              size="sm"
                              style={{ color: "#fff" }}
                            >
                              {sessionName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                              onSelect={this.onChangeHandle}
                              style={{
                                overflowY: "scroll",
                                maxHeight: "240px",
                              }}
                            >
                              {sessions &&
                                sessions.map((el) => (
                                  <Dropdown.Item
                                    eventKey={JSON.stringify({
                                      name: el.dateName,
                                      id: el.dateID,
                                    })}
                                    key={el.dateID}
                                  >
                                    {el.dateName}
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown>
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formHorizontalPassword">
                  <span className="col-md-4">
                  This week's session
                    </span>
                    <Col sm={8}>
                    <DatePicker
                          selected={start_date}
                          onChange={(date) => this.setStartDate(date)}
                          selectsStart
                          startDate={start_date}
                          endDate={end_date}
                          placeholderText="Start Date"
                          className="form-control dateWidth"
                          fullWidth
                          required
                          // maxDate={new Date()}
                        />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} controlId="formHorizontalPassword">
                  <span className="col-md-4">
                  Previous week's session
                    </span>
                    <Col sm={8}>
                    <DatePicker
                          selected={end_date}
                          onChange={(date) => this.setEndDate(date)}
                          selectsEnd
                          startDate={start_date}
                          endDate={end_date}
                          minDate={start_date}
                          // maxDate={new Date()}
                          placeholderText="End Date"
                          className="form-control dateWidth"
                          disabled={start_date ? false : true}
                        />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="text-center">
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Button type="submit" style={btnColor}>
                        create sheets
                      </Button>
                    </Col>
                  </Form.Group>
                </Form>
                            </Container>
                        </div>
                      </div>
                    </div>
    
                  </div>
                </div>
              </div>
            </>
          </div>
        )
    }
}
