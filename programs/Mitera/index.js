import React, { Component } from 'react'
import {
  Card,
  Form,
} from "react-bootstrap";
import { Button } from "@material-ui/core";
import MiteraScoreboard from './miteraScoreboard';
import MiteraActivity from './miteraActivity'
import AdjustPreviousUpdate from './adjustPreviousUpdate'
import InfoCDI from './infoCDI'
import MiteraMentorUpdate from './miteraMentorUpdate'
import MiteraMentorUpdate2 from './mentorUpdate2'
import ReviewChange from './reviewChange'
import Changedate from './changeDate'
import Changedate2 from './changeDate2'
import WeeklyUpdate from './weeklyUpdate'
import MiteraReports from './miteraReports'
import MiteraWalkList from './miteraWalkList'
import MiteraSetting from './miteraSetting'
import PermissionSlipTracking from './permissionSlipTracking'
import EditWeeklyUpdate from './editWeeklyUpdate'
import MentorSetup from './mentorSetup'
import MentorToChildConfig from './mentorToChildConfig'
import AttendancePerWeek from './attendancPerWeek'
import PrintoutsAttendance from './printOutAttendance'
import ProgramGraduate from './programGraduates'
import PrinoutSheet from './printoutsheet'
import SendChangeCDI from './sendChangeCDI'

// import "./programs.css"

const btnText = { textTransform: "unset", fontSize: "12px" };


function getItem(key){
  return JSON.parse(localStorage.getItem(key))
}

export default class Mitera extends Component {

constructor(props) {
  super(props)

  this.state = {
    //  programName:this.props.location.search
  }
}


  moveToTab=(tabName)=>{
    this.props.history.push("/progList/"+tabName)
  }
    render() {
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
                          <Button color={tab==="scoreboard" ? "primary" : "inherit"} size="large" style={btnText} onClick={()=>this.moveToTab("scoreboard")}>
                          Scorecard
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span  className={tab==="activity" || tab==="adjustPreviousUpdate" || tab==="miteraInfoCDI" || tab==="weeklyUpdate"
                        || tab==="mentorUpdate"  || tab==="mentorUpdate2" || tab==="reviewChanges" || tab==="changeDate" || tab==="changeDate2"
                        || tab==="sendChanges"? "borderLeftStyle" : ""}>
                        </span>
                        <span className="">
                          <Button color={tab==="activity" || tab==="adjustPreviousUpdate" || tab==="miteraInfoCDI" || tab==="weeklyUpdate"
                          || tab==="mentorUpdate"   || tab==="mentorUpdate2" || tab==="reviewChanges" || tab==="changeDate" || tab==="changeDate2" || tab==="sendChanges"
                          ? "primary" : "inherit"} size="small" style={btnText} onClick={()=>this.moveToTab("activity")}>
                            Activity
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span className="">
                        </span>
                        <span className={tab==="miteraReports" || tab==="walkList"  || tab==="attendancePerWeek" || tab==="printoutAttendance"
                        || tab==="printoutAttendance" || tab==="graduates" || tab==="sheet" ? "borderLeftStyle" : ""}>
                          <Button color={tab==="miteraReports" || tab==="walkList" || tab==="attendancePerWeek" || tab==="printoutAttendance"
                          || tab==="printoutAttendance" || tab==="graduates" || tab==="sheet"
                          ? "primary" : "inherit"} size="small" style={btnText} onClick={()=>this.moveToTab("miteraReports")}>
                            Reports
                          </Button>
                        </span>
                      </Form.Row>
                      <Form.Row className="py-2">
                        <span className="">
                        </span>
                        <span className={tab==="miteraSetting" || tab==="permissionSlipTracking" ||
                         tab==="permissionSlipTrackingGrades" || tab==="mentorSetup" || 
                         tab==="mentorToChildConfig" || tab==="permissionSlipTracking" || tab==="permissionSlipTrackingGrades" 
                         || tab==="editWeeklyUpdate"
                         ? "borderLeftStyle" : ""}>
                          <Button color={tab==="miteraSetting" || tab==="permissionSlipTracking"
                          || tab==="permissionSlipTrackingGrades" || tab==="mentorSetup" || tab==="permissionSlipTracking" || tab==="permissionSlipTrackingGrades"
                          || tab==="mentorToChildConfig" || tab==="editWeeklyUpdate"
                          ? "primary" : "inherit"} size="small" style={btnText} onClick={()=>this.moveToTab("miteraSetting")}>
                            Setting
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
           
    {tab==="scoreboard" ? <MiteraScoreboard programName={getItem("progName").name} programId={getItem("progName").id}/> : null }
    {tab==="activity" ? <MiteraActivity {...this.props.history}/> : null}
    {tab==="adjustPreviousUpdate" ? <AdjustPreviousUpdate  {...this.props.history}/> : null}
    {tab==="miteraInfoCDI"? <InfoCDI {...this.props.history}/> : null}
    {tab==="mentorUpdate" ? <MiteraMentorUpdate {...this.props.history}/> : null}
    {tab==="mentorUpdate2" ? <MiteraMentorUpdate2 {...this.props.history}/> : null}
    {tab==="reviewChanges" ? <ReviewChange {...this.props.history}/> : null}
    {tab==="changeDate" ? <Changedate {...this.props.history} /> : null}
    {tab==="changeDate2" ? <Changedate2 {...this.props.history}/> : null}
    {tab==="weeklyUpdate" ? <WeeklyUpdate {...this.props.history}/> : null}
    {tab==="miteraReports" ? <MiteraReports {...this.props.history}/> : null}
    {tab==="walkList" ? <MiteraWalkList {...this.props.history}/> : null}
    {tab==="miteraSetting" ? <MiteraSetting {...this.props.history}/> : null}   
    {tab==="permissionSlipTracking" ? <PermissionSlipTracking {...this.props.history}/> : null}   
     {tab==="editWeeklyUpdate" ? <EditWeeklyUpdate {...this.props.history}/> : null}
     {tab==="mentorSetup" ? <MentorSetup {...this.props.history}/> : null}
     {tab==="mentorToChildConfig" ? <MentorToChildConfig {...this.props.history}/> : null}
     {tab==="attendancePerWeek" ? <AttendancePerWeek {...this.props.history}/> : null}
     {tab==="printoutAttendance" ? <PrintoutsAttendance {...this.props.history}/> : null}
     {tab==="graduates" ? <ProgramGraduate {...this.props.history}/> : null}
     {tab==="sheet" ? <PrinoutSheet {...this.props.history}/> : null}
     {tab==="sendChanges" ? <SendChangeCDI {...this.props.history}/> : null}
        </div>
      </>
       
    }
}
