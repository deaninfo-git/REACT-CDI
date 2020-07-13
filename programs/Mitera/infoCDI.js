import React, { Component } from "react";
import { Button } from "react-bootstrap";
import {
  callApi
} from "../../../crud/auth.crud";
import swal from "sweetalert";

import InfoCDITAble from './infoCDITable'
const btnColorRed = {
  backgroundColor: "#ef1f2f",
  border: "none",
};
const btnColor = {
  backgroundColor: "#f4b53f",
  border: "none",
};

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export default class InfoCDI extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      date:"",
      kids: [],
      kids_list:[],
      mentor_list:[],
      mentors:[],uploadid:[]
    }
  }
  

   async componentDidMount() {
     await this.getData()
   }
   

  getData = async () => {
    let payload= this.props.location.state
    if(payload.date_id && payload.week_id)
    try {
      let result = await callApi("edit-other-activity-update",payload);
      if (result.status === 200) {
        let DATA= result.data;
        this.setState({
          date: DATA.date,
          kids: DATA.kids,
          kids_list:DATA.kids_list,
          mentor_list:DATA.mentor_list,
          mentors:DATA.mentors,
          uploadid:DATA.uploadid
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  moveToAdjPage = (pageNumber) => {
    let payload= this.props.location.state
    this.props.push({
      pathname: "/progList/" + pageNumber,
      state: {...payload,mentor_list:this.state.mentor_list,date:this.state.date,uploadid:this.state.uploadid
      }
    })
  };

  render() {
    console.log('mitera info cdi',this.props)
    return (
      <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">{getItem('progName').name} Info in CDI</h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                      <span className="py-1">Date of Activity :</span> &nbsp; &nbsp;
                         <span className="font-weight-bold">{this.state.date}</span>
                      <div className="py-2">
                        <Button type="submit" style={btnColor}   onClick={()=>this.moveToAdjPage("adjustPreviousUpdate")}>
                          Select Different Date
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                      <span className="py-1">Participating Mentors :</span> 
                      <div className="py-2">
                        <Button type="submit" style={btnColor} 
                        onClick={()=>this.moveToAdjPage("mentorUpdate")}>
                          Edit Mentor Participation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div> */}
              </div>

              <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content text-center">
                      <p>{getItem('progName').id===15? "Adults" : "Kids"} List</p>
                      <InfoCDITAble tableData={this.state.kids}/>
                    </div>
                  </div>
                  {/* <div className="text-center">
                <Button
                  type="submit"
                  style={btnColor}
                >
                  Edit {getItem('progName').id===15? "Adults" : "Kids"} Participation
                </Button>
              </div> */}
              <div className="text-center py-4">
                <Button
                  type="submit"
                  style={btnColorRed}
                  onClick={()=>this.moveToAdjPage("mentorUpdate")}
                >
                 Adjust Mentor Participation
                </Button>
              </div>
                </div>
              
            </div>
          </div>
        </>
      </div>
    );
  }
}
