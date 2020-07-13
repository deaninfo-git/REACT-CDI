import React, { Component } from "react";
import {  Button } from "react-bootstrap";
// import InfoCDITAble from './infoCDITable'
import { callApi } from "../../../crud/auth.crud";
import swal from "sweetalert";
import MentorFinalTable from './mentorFinalTable'
import KidFinalTable from './kidFinalTable'

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

export default class ReviewChange extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       date:"",kids:[],mentors:[],loader:true
    }
  }
  
 
   async componentDidMount() {
        const {attended,
            attended_all,
            behavior,
            behavior2,
            behavior2_all,
            behavior3,
            behavior3_all,
            behavior_all,
            checked_mentor,
            date_id,
            mentor_list,
            program_id,
            verse,
            verse_all,
            week_id}= this.props.location.state
        let finalAttended= attended.concat(attended_all);
      let finalBehavior= behavior.concat(behavior_all);
      let finalBehavior2= behavior2.concat(behavior2_all);
      let finalBehavior3 = behavior3.concat(behavior3_all)
      let finalVerse = verse.concat(verse_all)

      const payload={program_id,date_id,week_id,mentor_list:mentor_list.join(),kid_list:finalAttended.join(),behavior:finalBehavior.join(),behaviortwo:finalBehavior2.join(),
        behaviorthree:finalBehavior3.join(),verse:finalVerse.join()}
      try {
        let result = await callApi("edit-other-activity-list",payload);
        if (result.status === 200) {
          let DATA = result.data;
          console.log(DATA, "DATA");
          this.setState({
            date: DATA.date,
            kids: DATA.kids,
            mentors:DATA.mentors,loader:false
          });
        } 
      } catch {
        this.setState({loader:false})
        swal("Oops!", "Network Error!", "error");
      }
    }
  moveToAdjPage = (pageNumber) => {
    let payload = this.props.location.state;
    this.props.push({
      pathname: '/progList/'+pageNumber,
      state: {...payload }
    })
  };

  render() {
    console.log('this reveiw props',this.props)
    return (
      <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">{getItem('progName').name} Mentor Update</h3>
              </div>
            </div>
            { this.state.loader ? <div
              className="spinner-border text-warning activityUpdateLoad"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div> :    <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                      <span className="py-1">Date of Activity :</span> &nbsp; &nbsp;
                        <span className="font-weight-bold">{this.props.location.state.date}</span>
                      <div className="py-2">
                        <Button type="submit" style={btnColor} 
                         onClick={()=>this.moveToAdjPage("adjustPreviousUpdate")}
                        >
                          Select Different Date
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                      <span className="py-1">Participating Mentors :</span> 
                      <div className="py-2">
                        <Button type="submit" style={btnColor}
                          onClick={()=>this.moveToAdjPage("mentorUpdate")}
                        >
                          Edit Mentor Participation
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                     <MentorFinalTable tableData={this.state.mentors}/>
                    </div>
                  </div>
                  <div className="kt-section">
                    <div className="kt-section__content">
                     <KidFinalTable  tableData={this.state.kids}/>
                    </div>
                  </div>
                  <div className="text-center">
                <Button
                  type="submit"
                  style={btnColor}
                  onClick={()=>this.moveToAdjPage("mentorUpdate2")}
                >
                  Edit  {getItem('progName').id===15? "Adults" : "Kids"}  Participation
                </Button>
              </div>
              <div className="text-center py-4">
                <Button
                  type="submit"
                  style={btnColorRed}
                  onClick={()=>this.moveToAdjPage("sendChanges")}
                >
                 Send Changes to CDI
                </Button>
              </div>
                </div>

              
            </div>}
          </div>
        </>
      </div>
    );
  }
}

