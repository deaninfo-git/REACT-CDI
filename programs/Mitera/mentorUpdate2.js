import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import MiteraMentorUpdateTable from "./miteraMentorUpdateTable";
import MiteraMentorUpdateTable2 from "./miteraMentorUpdateTable2";
import MiteraMentorUpdateTable3 from "./miteraMentorUpdateTable3";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { callApi } from "../../../crud/auth.crud";
import swal from "sweetalert";
import "./mitera.css";

const btnColorRed = {
  backgroundColor: "#ef1f2f",
  border: "none",
};

const expandColor = {
  backgroundColor: "#f3a002",
  color: "#fff",
};

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

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export default class MiteraMentorUpdate2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      previous_participants: [],
      all: [],
      attended: this.props.location.state.attended ? [...this.props.location.state.attended] : [],
      behavior: this.props.location.state.behavior ? [...this.props.location.state.behavior] : [],
      behavior2: this.props.location.state.behavior2 ? [...this.props.location.state.behavior2] : [],
      behavior3: this.props.location.state.behavior3 ? [...this.props.location.state.behavior3] : [],
      verse: this.props.location.state.verse ? [...this.props.location.state.verse] : [],
      attended_all: this.props.location.state.attended_all ? [...this.props.location.state.attended_all] : [],
      behavior_all:  this.props.location.state.behavior_all ? [...this.props.location.state.behavior_all] :[],
      behavior2_all: this.props.location.state.behavior2_all ? [...this.props.location.state.behavior2_all] : [],
      behavior3_all: this.props.location.state.behavior3_all ? [...this.props.location.state.behavior3_all] : [],
      verse_all: this.props.location.state.verse_all ? [...this.props.location.state.verse_all] : [],
    };
  }

  async componentDidMount() {
    await this.getData();
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
  };
  }

  getData = async () => {
    let payload = this.props.location.state;
    if (payload.date_id && payload.program_id)
      try {
        let result = await callApi("edit-other-activity-participant", {
          program_id: payload.program_id,
          date_id: payload.date_id,
        });
        if (result.status === 200) {
          let DATA = result.data;
          console.log(DATA, "DATA");
          this.setState({
            previous_participants: DATA.previous_participants,
            all: DATA.all,
          });
        } else {
          swal("Oops!", "Please try again!", "error");
        }
      } catch {
        swal("Oops!", "Network Error!", "error");
      }
  };

  onChangeHandleAttended = (id) => {
    let cArr = [...this.state.attended];
    cArr.push(id);
    removeDuplicates(cArr);
    this.setState({ attended: cArr });
  };

  onChangeHandleVerse = (id) => {
    let cArr = [...this.state.verse];
    cArr.push(id);
    removeDuplicates(cArr);
    this.setState({ verse: cArr });
  };

  onChangeHandleBehavior = (id, num) => {
    if (num === "one") {
      let cArr = [...this.state.behavior];
      cArr.push(id);
      removeDuplicates(cArr);
      this.setState({ behavior: cArr });
    }
    if (num === "two") {
      let cArr = [...this.state.behavior2];
      cArr.push(id);
      removeDuplicates(cArr);
      this.setState({ behavior2: cArr });
    }
    if (num === "three") {
      let cArr = [...this.state.behavior3];
      cArr.push(id);
      removeDuplicates(cArr);
      this.setState({ behavior3: cArr });
    }
  };

  onChangeHandleAttended_all = (id) => {
    let cArr = [...this.state.attended_all];
    cArr.push(id);
    removeDuplicates(cArr);
    this.setState({ attended_all: cArr });
  };

  onChangeHandleVerse_all = (id) => {
    let cArr = [...this.state.verse_all];
    cArr.push(id);
    removeDuplicates(cArr);
    this.setState({ verse_all: cArr });
  };

  onChangeHandleBehavior_all = (id, num) => {
    if (num === "one") {
      let cArr = [...this.state.behavior_all];
      cArr.push(id);
      removeDuplicates(cArr);
      this.setState({ behavior_all: cArr });
    }
    if (num === "two") {
      let cArr = [...this.state.behavior2_all];
      cArr.push(id);
      removeDuplicates(cArr);
      this.setState({ behavior2_all: cArr });
    }
    if (num === "three") {
      let cArr = [...this.state.behavior3_all];
      cArr.push(id);
      removeDuplicates(cArr);
      this.setState({ behavior3_all: cArr });
    }
  };

  moveToAdjPage = (pageNumber) => {
    let payload= this.props.location.state
    const{attended,behavior,behavior2,behavior3,verse,attended_all,
      behavior_all,behavior2_all,behavior3_all,verse_all}=this.state
      if((attended.length || attended_all.length) && (behavior.length || behavior_all.length) && (verse.length || verse_all.length))
     { this.props.push({
        pathname: "/progList/" + pageNumber,
        state: {...payload,attended,behavior,behavior2,behavior3,verse,attended_all,
          behavior_all,behavior2_all,behavior3_all,verse_all}
      })}
      else{
        swal("Required!", "Please select attended,behavior and verse for proceed further!", "error");

      }
  };
  render() {
    console.log("props2", this.props);
    const { previous_participants, all } = this.state;
    return (
      <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">
                  {" "}
                  {getItem("progName").name} Mentor Update
                </h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row"></div>

              <div className="col-md-12">
                <div className="kt-section">
                  <div className="kt-section__content text-center">
                    <ExpansionPanel style={expandColor}>
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
                      <div>  <MiteraMentorUpdateTable2
                          tableData={previous_participants}
                          onChangeHandleAttended={this.onChangeHandleAttended}
                          attended={this.state.attended}
                          onChangeHandleBehavior={this.onChangeHandleBehavior}
                          behavior={this.state.behavior}
                          behavior2={this.state.behavior2}
                          behavior3={this.state.behavior3}
                          verse={this.state.verse}
                          onChangeHandleVerse={this.onChangeHandleVerse}
                        /></div>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel style={expandColor}>
                      <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        // className={classes.expandColor}
                      >
                        <Typography>
                          {getItem("progName").id === 15 ? "Adults" : "Kids"}{" "}
                          eligible for {getItem("progName").name}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className="expansionPadding">
                        <MiteraMentorUpdateTable3
                          tableData={all}
                          onChangeHandleAttended_all={
                            this.onChangeHandleAttended_all
                          }
                          attended_all={this.state.attended_all}
                          onChangeHandleBehavior_all={
                            this.onChangeHandleBehavior_all
                          }
                          behavior_all={this.state.behavior_all}
                          behavior2_all={this.state.behavior2_all}
                          behavior3_all={this.state.behavior3_all}
                          verse_all={this.state.verse_all}
                          onChangeHandleVerse_all={this.onChangeHandleVerse_all}
                        />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </div>
                <div className="text-center py-4">
                  <Button
                    type="submit"
                    style={btnColorRed}
                    onClick={() => this.moveToAdjPage("reviewChanges")}
                  >
                    Review Changes
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
