import React, { Component } from 'react'
import {
  Card,
  Form
} from "react-bootstrap";
import { Button } from "@material-ui/core";
import Scoreboard from './scoreboard'
import Activity from './activity'
import ProgReports from './progReports'
import AttendancePerWeek from './attendancePerWeek'
import PrintoutsAttendance from './printoutsAttendance'
import ProgramSetting from './programSetting'
import PermissionSlipTracking from './permissionSlipTracking'
import MentorSetup from './mentorSetup'
import MentorToChildConfig from './mentorToChildConfig'
import EditWeeklyUpdate from './editWeekelyUpdate'
import WalkList from './walkList'
import ProgramGraduate from './programGraduates'
import PrinoutSheet from './prinoutSheet'
import KPK from './KPK'
import AddedToCDI from './addedToCDI'
import SubjectReports from './subjectReports'
import SubjectReportsDetails from './subjectReportsDetails'
import "./programs.css"

const btnText = { textTransform: "unset", fontSize: "12px" };


export default class Programs extends Component {
  _isMounted = false;

   componentDidMount() {
    this._isMounted = true;
    let obj= {name:"Kid Power",id:6}
    localStorage.setItem("progName",JSON.stringify(obj))
 }
  moveToTab=(tabName)=>{
    this.props.history.push("/programs/"+tabName)
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
    render() {
      // console.log('props kid props',this.props)
      let tab=this.props.match.params.tab;
      return    <>
        <div className="row">
          <div className="col-md-4">
            <div className="kt-section">
              <span className="kt-section__sub"></span>
              <Card style={{ width: "20rem" }}>
                <Card.Body>
                 
                  <Card.Text>

                  <Form
                      // onSubmit={handleSubmit}
                      className="mt-4 ml-4"
                    >
                      <Form.Row className="py-2">
                        <span className={tab==="scoreboard" ? "borderLeftStyle" : ""}>
                        </span>
                        <span className="">
                          <Button color={tab==="scoreboard" ? "primary" : "inherit"} size="small" style={btnText} onClick={()=>this.moveToTab("scoreboard")}>
                            Scorecard
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span  className={tab==="activity" || tab==="adddedToCDI" ? "borderLeftStyle" : ""}>
                        </span>
                        <span className="">
                          <Button color={tab==="activity" || tab==="adddedToCDI" ? "primary" : "inherit"} size="small" style={btnText} onClick={()=>this.moveToTab("activity")}>
                            Activity
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span className="">
                        </span>
                        <span className={tab==="progReports" || tab==="attendancePerWeek" 
                        || tab==="printoutAttendance" || tab==="walkList" || tab==="graduates" || tab==="sheet" || tab==="subject-reports" || tab==="subject-reports-details" ? "borderLeftStyle" : ""}>
                          <Button color={tab==="progReports" || tab==="attendancePerWeek" || tab==="sheet"
                          || tab==="printoutAttendance" || tab==="walkList" || tab==="graduates" || tab==="subject-reports" || tab==="subject-reports-details"
                          ? "primary" : "inherit"} size="small" style={btnText} onClick={()=>this.moveToTab("progReports")}>
                            Reports
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span className="">
                        </span>
                        <span className={tab==="programSetting" || tab==="permissionSlipTracking" ||
                         tab==="permissionSlipTrackingGrades" || tab==="mentorSetup" || 
                         tab==="mentorToChildConfig" || tab==="editWeeklyUpdate"
                         ? "borderLeftStyle" : ""}>
                          <Button color={tab==="programSetting" || tab==="permissionSlipTracking"
                          || tab==="permissionSlipTrackingGrades" || tab==="mentorSetup"
                          || tab==="mentorToChildConfig" || tab==="editWeeklyUpdate"
                          ? "primary" : "inherit"} size="small" style={btnText} onClick={()=>this.moveToTab("programSetting")}>
                            Setting
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span className="">
                        </span>
                        <span className="">
                          <Button color={tab==="KPK" ? "primary" : "inherit"} size="small" style={btnText} onClick={()=>this.moveToTab("KPK")}>
                            KPK
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span className="">
                        </span>
                        <span className="">
                          <Button color="inherit" size="small" style={btnText}>
                            KP1
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span className="">
                        </span>
                        <span className="">
                          <Button color="inherit" size="small" style={btnText}>
                            KP2
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span className="">
                        </span>
                        <span className="">
                          <Button color="inherit" size="small" style={btnText}>
                            KP3
                          </Button>
                        </span>
                      </Form.Row>
                    </Form> 
                  </Card.Text>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            </div>
          </div>
           
    {tab==="scoreboard" ? <Scoreboard/> : null }
     {tab==="activity" ? <Activity {...this.props.match} {...this.props.history}/> : null}
     {tab==="progReports" ? <ProgReports {...this.props.history} /> : null}
     {tab==="attendancePerWeek" ? <AttendancePerWeek/> : null}
     {tab==="printoutAttendance" ? <PrintoutsAttendance {...this.props.history}/> : null}
     {tab==="programSetting" ? <ProgramSetting {...this.props.history}/> : null}
     {tab==="permissionSlipTracking" ? <PermissionSlipTracking /> : null}
     {tab==="mentorSetup" ? <MentorSetup /> : null}
     {tab==="mentorToChildConfig" ? <MentorToChildConfig /> : null}
     {tab==="KPK" ? <KPK/> : null}
     {tab==="editWeeklyUpdate" ? <EditWeeklyUpdate {...this.props.history}/> : null}
     {tab==="walkList" ? <WalkList {...this.props.history}/> : null}
     {tab==="graduates" ? <ProgramGraduate {...this.props.history}/> : null}
     {tab==="sheet" ? <PrinoutSheet {...this.props.history}/> : null}
     {tab==="adddedToCDI" ? <AddedToCDI/>:null}
     {tab==="subject-reports" ? <SubjectReports {...this.props}/> : null}
     {tab==="subject-reports-details" ? <SubjectReportsDetails/>:null}
        </div>
      </>
       
    }
}
