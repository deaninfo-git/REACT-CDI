import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Dropdown } from "react-bootstrap";
import MiteraMentorUpdateTable from "./miteraMentorUpdateTable";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  getSessions,
  callApi,
  fetchDataWithPagination,
} from "../../../crud/auth.crud";
import WeeklyUpdatestep3Table from "./weeklyUpdateStep3Table";
import WeeklyUpdatestep31Table from "./weeklyUpdatestep31Table";
import UpdateMentorTable from "./updatedMentorsTable";
import UpdateParticipantsTable from "./updateParticipantsTable";
import FinalListTable from "./finalListTable";
import swal from "sweetalert";
import Pagination from "react-js-pagination";

import "./mitera.css";

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function getSteps() {
  return [
    "Update step-1",
    "Update step-2",
    "Update step-3",
    "Update step-4",
    "Update step-5",
  ];
}

function removeDuplicates(arr) {
  var i, tmp;
  for (i = 0; i < arr.length; i++) {
    tmp = arr.lastIndexOf(arr[i]);
    if (tmp === i) {
      //Only one of this number
    } else {
      //More than one
      arr.splice(tmp, 1);
      arr.splice(i, 1);
    }
  }
}

const emptyState = {
  activeStep: 0,
  tableDataPage2: [],
  current_page2: 1,
  total2: null,
  per_page2: null,
  tableDataPage3: [],
  current_page3: 1,
  total3: null,
  per_page3: null,
  tableDataPage31: [],
  attended: [],
  attended3: [],
  verse: [],
  behavior: [],
  behaviortwo: [],
  behaviorthree: [],
  verseConcat: [],
  attended3Concat: [],
  behaviorConcat: [],
  behaviortwoConcat: [],
  behaviorthreeConcat: [],
  updatedDate: {},
  updatedMentors: [],
  updatedParticipants: [],
  finalData: {},
  finalList: [],
};

class WeeklyUpdate extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      sessions: [],
      sessionName: "",
      session_dateId: "",
      activeStep: 0,
      allDates: [],
      date: "",
      dayID: "",
      tableDataPage2: [],
      current_page2: 1,
      total2: null,
      per_page2: null,
      tableDataPage3: [],
      current_page3: 1,
      total3: null,
      per_page3: null,
      tableDataPage31: [],
      attended: [],
      attended3: [],
      verse: [],
      behavior: [],
      behaviortwo: [],
      behaviorthree: [],
      verseConcat: [],
      attended3Concat: [],
      behaviorConcat: [],
      behaviortwoConcat: [],
      behaviorthreeConcat: [],
      updatedDate: {},
      updatedMentors: [],
      updatedParticipants: [],
      finalData: {},
      finalList: [],
    };
  }

  async componentDidMount() {
    await this.getAllSessions();
    await this.getWeeks();
    // await this.getDataPage3()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.activeStep !== this.state.activeStep &&
      this.state.activeStep === 1
    ) {
      this.getDataPage2();
    }
    if (prevState.current_page2 !== this.state.current_page2) {
      this.getDataPage2();
    }
    if (
      prevState.activeStep !== this.state.activeStep &&
      this.state.activeStep === 2
    ) {
      this.getDataPage3();
    }
    if (prevState.current_page3 !== this.state.current_page3) {
      this.getDataPage3();
    }

    if (
      prevState.activeStep !== this.state.activeStep &&
      this.state.activeStep === 3
    ) {
      this.getDataPage4();
    }

    if (
      prevState.activeStep !== this.state.activeStep &&
      this.state.activeStep === 4
    ) {
      this.getDataPage4();
    }
  }

  handlePageChange = (pageNumber) => {
    this.setState({ current_page2: pageNumber });
  };

  handlePageChange2 = (pageNumber) => {
    this.setState({ current_page3: pageNumber });
  };

  getAllSessions = async () => {
    try {
      let result = await getSessions();
      console.log("program result", result);
      if (result.status === 200) {
        this.setState({
          sessions: result.data.data,
          sessionName: result.data.data[0].dateName,
          session_dateId: result.data.data[0].dateID,
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  getWeeks = async () => {
    const { session_dateId } = this.state;
    let program_id = getItem("progName").id;
    try {
      let result = await callApi("other-activity-update-weeks", {
        program_id,
        date_id: session_dateId,
      });
      if (result.status === 200) {
        console.log("get", result.data.data);
        this.setState({
          allDates: result.data.data,
          date: result.data.data[0].date,
          dayID: result.data.data[0].dayID,
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  getDataPage2 = async () => {
    const { session_dateId, dayID, current_page2 } = this.state;
    let program_id = getItem("progName").id;
    try {
      let result = await fetchDataWithPagination(
        "other-activity-update-2",
        current_page2,
        {
          program_id: program_id,
          date_id: session_dateId,
          week_id: dayID,
        }
      );
      if (result.status === 200) {
        console.log("get2", result.data.data);
        this.setState({
          tableDataPage2: result.data.data.data,
          current_page2: result.data.data.current_page
            ? result.data.data.current_page
            : 1,
          total2: result.data.data.total,
          per_page2: result.data.data.per_page,
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  getDataPage3 = async () => {
    const { session_dateId, dayID, current_page3 } = this.state;
    let program_id = getItem("progName").id;
    try {
      let result = await fetchDataWithPagination(
        "other-activity-update-3",
        current_page3,
        {
          program_id: program_id,
          date_id: session_dateId,
          week_id: dayID,
        }
      );
      if (result.status === 200) {
        // console.log("get3", result.data.kids);
        this.setState({
          tableDataPage3: result.data.allkids.data,
          tableDataPage31: result.data.kids,
          current_page3: result.data.allkids.current_page
            ? result.data.allkids.current_page
            : 1,
          total3: result.data.allkids.total,
          per_page3: result.data.allkids.per_page,
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  getDataPage4 = async () => {
    const {
      session_dateId,
      dayID,
      attended3,
      attended3Concat,
      behavior,
      behaviorConcat,
      behaviortwo,
      behaviortwoConcat,
      behaviorthree,
      behaviorthreeConcat,
      verse,
      verseConcat,
      attended,
    } = this.state;
    let program_id = getItem("progName").id;
    let url =
      this.state.activeStep === 3
        ? "other-activity-update-4"
        : "other-activity-update-5";
    let payload = {
      program_id,
      date_id: session_dateId,
      week_id: dayID,
      attended: attended3.concat(attended3Concat),
      behavior: behavior.concat(behaviorConcat),
      behaviortwo: behaviortwo.concat(behaviortwoConcat),
      behaviorthree: behaviorthree.concat(behaviorthreeConcat),
      verse: verse.concat(verseConcat),
      mentor_list: attended,
    };
    try {
      let result = await callApi(url, payload);
      if (result.status === 200) {
        let DATA = result.data;
        if (this.state.activeStep === 3) {
          this.setState({
            updatedDate: DATA.date,
            updatedMentors: DATA.mentors,
            updatedParticipants: DATA.participant,
          });
        } else {
          this.setState({
            finalData: DATA.data,
            finalList: DATA.list,
          });
        }
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch (err) {
      if (err && err.response && err.response.status===401) {
        swal(
          "Required Field!",
          "You can not leave empty field from the previous step!",
          ""
        );
      } else swal("Oops!", "Network Error!", "error");
    }
  };

  onChangeHandle = (e) => {
    let obj = JSON.parse(e);
    this.setState({ sessionName: obj.name, session_dateId: obj.id }, () =>
      this.getWeeks()
    );
  };

  onChangeHandleWeek = (e) => {
    let obj = JSON.parse(e);
    this.setState({ date: obj.name, dayID: obj.id });
  };

  getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return this.step1();
      case 1:
        return this.step2();
      case 2:
        return this.step3();
      case 3:
        return this.step4();
      case 4:
        return this.step5();
      default:
        return "Uknown stepIndex";
    }
  };

  step1 = () => {
    const { sessions, sessionName, allDates, date } = this.state;
    return (
      <>
        <div className="kt-section__content d-flex">
          <span className="py-1">Choose your semester</span>
          <span className="px-2">
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
                style={{ overflowY: "scroll", maxHeight: "240px" }}
              >
                {sessions && sessions.length > 0 ? (
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
                  ))
                ) : (
                  <Dropdown.Item>Loading...</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
        <div className="kt-section__content d-flex py-2">
          <span className="py-1">Choose your week</span>
          <span className="px-2">
            <Dropdown onSelect={this.onChangeHandleWeek}>
              <Dropdown.Toggle
                variant="warning"
                id="dropdown-basic"
                size="sm"
                style={{ color: "#fff" }}
              >
                {date}
              </Dropdown.Toggle>

              <Dropdown.Menu
                style={{ overflowY: "scroll", maxHeight: "240px" }}
              >
                {allDates && allDates.length > 0 ? (
                  allDates.map((el) => (
                    <Dropdown.Item
                      eventKey={JSON.stringify({
                        name: el.date,
                        id: el.dayID,
                      })}
                      key={el.dayID}
                    >
                      {el.date}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item>Loading...</Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
      </>
    );
  };
  step2 = () => {
    return (
      <>
        {" "}
        <MiteraMentorUpdateTable
          tableData={this.state.tableDataPage2}
          onChangeAttendend={this.onChangeAttendend}
          attended={this.state.attended}
        />
        {this.state.total2 > 10 ? (
          <Pagination
            activePage={this.state.current_page2}
            itemsCountPerPage={10}
            totalItemsCount={this.state.total2}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
            itemClass="page-item"
            linkClass="page-link"
          />
        ) : null}
      </>
    );
  };

  onChangeAttendend = (mentorID, id) => {
    let cArr = [...this.state.attended];
    cArr.push(mentorID);
    removeDuplicates(cArr);
    this.setState({ attended: cArr });
  };

  step3 = () => {
    return (
      <>
        <ExpansionPanel className="expandColor">
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            // className={classes.expandColor}
          >
            <Typography>
              Previous {getItem("progName").name} participants
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="expansionPadding">
            <WeeklyUpdatestep3Table
              tableData={this.state.tableDataPage3}
              onChangeTick={this.onChangeTick}
              program_id={getItem("progName").id}
              attended3={this.state.attended3}
              behavior={this.state.behavior}
              behaviortwo={this.state.behaviortwo}
              behaviorthree={this.state.behaviorthree}
              verse={this.state.verse}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
        <ExpansionPanel className="expandColor">
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            // className={classes.expandColor}
          >
            <Typography>All {getItem("progName").id === 15 ? "Adults" : "Kids" }</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className="expansionPadding">
            <WeeklyUpdatestep31Table
              tableData={this.state.tableDataPage31}
              onChangeTick={this.onChangeTick}
              program_id={getItem("progName").id}
              attended3Concat={this.state.attended3Concat}
              behaviorConcat={this.state.behaviorConcat}
              behaviortwoConcat={this.state.behaviortwoConcat}
              behaviorthreeConcat={this.state.behaviorthreeConcat}
              verseConcat={this.state.verseConcat}
            />
          </ExpansionPanelDetails>
          <div className="text-center ml-4  mt-2">
            {this.state.total3 > 10 ? (
              <Pagination
                activePage={this.state.current_page3}
                itemsCountPerPage={10}
                totalItemsCount={this.state.total3}
                pageRangeDisplayed={5}
                onChange={this.handlePageChange2.bind(this)}
                itemClass="page-item"
                linkClass="page-link"
              />
            ) : null}
          </div>
        </ExpansionPanel>
      </>
    );
  };

  onChangeTick = (childID, name, check) => {
    if (name === "attendend") {
      if (check === "check") {
        let cArr = [...this.state.attended3];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ attended3: cArr });
      } else {
        let cArr = [...this.state.attended3Concat];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ attended3Concat: cArr });
      }
    }
    if (name === "behaviour") {
      if (check === "check") {
        let cArr = [...this.state.behavior];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ behavior: cArr });
      } else {
        let cArr = [...this.state.behaviorConcat];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ behaviorConcat: cArr });
      }
    }
    if (name === "verse") {
      if (check === "check") {
        let cArr = [...this.state.verse];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ verse: cArr });
      } else {
        let cArr = [...this.state.verseConcat];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ verseConcat: cArr });
      }
    }
    if (name === "behavior1") {
      if (check === "check") {
        let cArr = [...this.state.behavior];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ behavior: cArr });
      } else {
        let cArr = [...this.state.behaviorConcat];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ behaviorConcat: cArr });
      }
    }
    if (name === "behavior2") {
      if (check === "check") {
        let cArr = [...this.state.behaviortwo];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ behaviortwo: cArr });
      } else {
        let cArr = [...this.state.behaviortwoConcat];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ behaviortwoConcat: cArr });
      }
    }
    if (name === "behavior3") {
      if (check === "check") {
        let cArr = [...this.state.behaviorthree];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ behaviorthree: cArr });
      } else {
        let cArr = [...this.state.behaviorthreeConcat];
        cArr.push(childID);
        removeDuplicates(cArr);
        this.setState({ behaviorthreeConcat: cArr });
      }
    }
  };

  step4 = () => {
    return (
      <>
        <div className="kt-section__content d-flex">
          <span className="font-weight-bold">Date of Activity :</span>
          <span className="px-2">{this.state.updatedDate.date}</span>
        </div>
        <div className="kt-section__content">
          <UpdateMentorTable tableData={this.state.updatedMentors} />
        </div>
        <div className="kt-section__content">
          <UpdateParticipantsTable tableData={this.state.updatedParticipants} />
        </div>
      </>
    );
  };

  step5 = () => {
    return (
      <>
        <p className="font-weight-bold">This week's ratio</p>
        <div className="kt-section__content d-flex">
          <span>{getItem('progName').id===15? "Adults" : "Kids"} that atttended :</span>
          <span className="px-2">{this.state.finalData.kid_attended}</span>
        </div>
        <div className="kt-section__content d-flex">
          <span>Mentors that attended :</span>
          <span className="px-2">{this.state.finalData.mentor_attended}</span>
        </div>
        <div className="kt-section__content d-flex">
          <span>{getItem('progName').id===15? "Adults" : "Kids"} to mentor ratio :</span>
          <span className="px-2">{this.state.finalData.ratiocount}</span>
        </div>
        <div className="kt-section__content">
          <FinalListTable tableData={this.state.finalList} />
        </div>
      </>
    );
  };

  handleNext() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }

  handleBack() {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }

  handleReset() {
    this.setState(emptyState, () => this.getAllSessions());
  }

  render() {
    const steps = getSteps();
    console.log(this.state.attended3, "step");
    return (
      <div className="col-md-8">
        <div className="kt-portlet kt-portlet--height-fluid">
          <div className="kt-portlet__head">
            <div className="kt-portlet__head-label">
              <h3 className="kt-portlet__head-title">{getItem('progName').name} Activity Update</h3>
            </div>
          </div>
          <div className="kt-portlet__body">
            <div className="row">
              <div className="col-md-12">
                <div className="kt-section">
                  <div className="kt-section__content">
                    <div>
                      <Stepper
                        activeStep={this.state.activeStep}
                        alternativeLabel
                      >
                        {steps.map((label) => (
                          <Step key={label}>
                            <StepLabel>{label}</StepLabel>
                          </Step>
                        ))}
                      </Stepper>
                      <div>
                        {this.state.activeStep === steps.length ? (
                          <div>
                            <Typography>All steps completed</Typography>
                            <Button onClick={this.handleReset.bind(this)}>
                              Reset
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <Typography>
                              {this.getStepContent(this.state.activeStep)}
                            </Typography>
                            <div className="text-center py-4">
                              <Button
                                disabled={this.state.activeStep === 0}
                                onClick={this.handleBack.bind(this)}
                              >
                                Back
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleNext.bind(this)}
                              >
                                {this.state.activeStep === steps.length - 1
                                  ? "Finish"
                                  : "Next"}
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeeklyUpdate;
