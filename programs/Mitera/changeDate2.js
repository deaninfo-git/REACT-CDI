import React, { Component } from 'react'
import { Dropdown, Card } from "react-bootstrap";
import { Button } from "@material-ui/core";
import {callApi} from '../../../crud/auth.crud'
import swal from "sweetalert";
import {Link} from 'react-router-dom'
import './mitera.css'

const btnColor = {
  backgroundColor: "#ef1f2f",
  border: "none",
  color: "#fff",
  textTransform:"none"
};

export default class ChangeDate2 extends Component {
      constructor(props) {
        super(props)

        this.state = {
          original_date:"",
          semester:[],
          week:[],semester_name:"",week_name:"",semester_id:"",week_id:"",upload_id:""
        }
      }

  async componentDidMount() {
    await this.getData()
   //  await this.getDatesList()
  }
  
 
   getData = async () => {
     let payload = this.props.location.state
     console.log('payload',payload)
      if(payload.upload_id)
     try {
       let result = await callApi("fix-wrong-date-final",payload);
       console.log("program result", result.data.data);
       if (result.status === 200) {
         this.setState({
           original_date: result.data.data.original_date,
           semester: result.data.data.semester,
           semester_name:result.data.data.semester[0].date_name,
           semester_id:result.data.data.semester[0].date_id,
           week:result.data.data.week,
           week_name:result.data.data.week[0].dayDate,
           week_id:result.data.data.week[0].dateid,
           upload_id:result.data.data.upload_id
         });
       } else {
         swal("Oops!", "Please try again!", "error");
       }
     } catch {
       swal("Oops!", "Network Error!", "error");
     }
   };
    moveToAdjPage=async(pageName)=>{
      const {week_id,upload_id}=this.state;
      let program_id= this.props.location.state.program_id
      const payload = {program_id,date_id:week_id,upload_id}
      if(week_id && upload_id)
      try {
        let result = await callApi("fix-wrong-date-final-update",payload);
        console.log("program result", result.data.data);
        if (result.status === 200) {
          swal("Updated Successfully!","","success");
          this.props.push("/progList/"+pageName)
        } else {
          swal("Oops!", "Please try again!", "error");
        }
      } catch {
        swal("Oops!", "Network Error!", "error");
      }
    }

    onChangeHandle = (e) => {
      let obj = JSON.parse(e);
      this.setState({ semester_name: obj.name,semester_id: obj.id });
    };

    onChangeHandleWeek=(e)=>{
      let obj = JSON.parse(e);
      this.setState({ week_name: obj.name,week_id: obj.id });
    }
    render() {
      console.log('this.state',this.state)
      const {semester,semester_name,week,week_name}=this.state;
        return (
            <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Just Change the Date</h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                        <Card
                      className="dateCardStyle"
                  >
                    <Card.Body>
                      <Card.Text>Original Date</Card.Text>
                          <Card.Text className="font-weight-bold">{this.state.original_date}</Card.Text>
                    </Card.Body>
                  </Card>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content ">
                    <p>New Date</p>
                    </div>
                  </div>
                </div> */}

                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                    <div className="d-flex ">
                        <span className="py-1 font-weight-bold">Change your Semester</span>
                        <span className="px-4">
                        <Dropdown onSelect={this.onChangeHandle} >
                            <Dropdown.Toggle
                              variant="warning"
                              id="dropdown-basic"
                              size="sm"
                              style={{ color: "#fff" }}
                            >
                              {semester_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                            style={{overflowY: 'scroll', maxHeight:"240px" }}
                            >
                              {semester &&
                                semester.map((el) => (
                                  <Dropdown.Item
                                    eventKey={JSON.stringify({
                                      name: el.date_name,
                                      id: el.date_id,
                                    })}
                                    key={el.date_id}
                                  >
                                    <Link to={{
                                        pathname: '/progList/adjustPreviousUpdate',
                                       state: { name:el.date_name, id: el.date_id }
                                      }}> {el.date_name}</Link> 
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                    <div className="d-flex">
                        <span className="py-1 font-weight-bold">Choose your week</span>
                        <span className="px-4">
                        <Dropdown onSelect={this.onChangeHandleWeek} >
                            <Dropdown.Toggle
                              variant="warning"
                              id="dropdown-basic"
                              size="sm"
                              style={{ color: "#fff" }}
                            >
                              {week_name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                            style={{overflowY: 'scroll', maxHeight:"240px" }}
                            >
                              {week &&
                                week.map((el,i) => (
                                  <Dropdown.Item
                                    eventKey={JSON.stringify({
                                      name: el.dayDate,
                                      id: el.dateid,
                                    })}
                                    key={el.dateid}
                                  >
                                    {el.dayDate}
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
               
              </div> <div className="text-center">
                <Button type="submit" style={btnColor} onClick={()=>this.moveToAdjPage("activity")}>
                       Make the Changes
                      </Button>
                </div>
            </div>
          </div>
        </>
      </div>
        )
    }
}
