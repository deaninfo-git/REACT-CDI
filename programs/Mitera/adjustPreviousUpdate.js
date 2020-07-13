import React, { Component } from 'react'
import {
  Dropdown,
  Button
  } from "react-bootstrap";
  import {
    getSessions,
    callApi
  } from "../../../crud/auth.crud";
  import swal from "sweetalert";

  const btnColor = {
    backgroundColor: "#ef1f2f",
    border: "none",
  };


  function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

export default class AdjustPreviousUpdate extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      sessions: [],
      sessionName: "",
      session_dateId: "",
      allDates: [],
      date: "",
      dayID: "",
    }
  }
  
  async componentDidMount() {
    await this.getAllSessions();
    await this.getWeeks();
    // await this.getDataPage3()
  }

  getAllSessions = async () => {
    console.log('linkprops',this.props)

    let linkProps = this.props.location ?  this.props.location : {state:{name:"",id:""}}

    try {
      let result = await getSessions();
      console.log("program result", result);
      if (result.status === 200) {
        if(linkProps.state && linkProps.state.name){
          this.setState({
            sessions: result.data.data,
            sessionName: linkProps.state.name,
            session_dateId: linkProps.state.id,
          });
        }
        else{
          this.setState({
            sessions: result.data.data,
            sessionName: result.data.data[0].dateName,
            session_dateId: result.data.data[0].dateID,
          });
        }   
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

    moveToAdjPage=(pageNumber)=>{
      this.props.push({
        pathname: '/progList/'+pageNumber,
        state: {...this.props.location.state,date_id: this.state.session_dateId, week_id:this.state.dayID,
         program_id: getItem('progName').id
        }
      })
    }

    render() {
      const { sessions, sessionName, allDates, date } = this.state;
        console.log('adjust',this.props)
  
        return (
            <div className="col-md-8">
            {/* <div className="kt-section"> */}
            <>
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
                      </div>
                    </div>
                    <div className="col-md-12">
                    <div className="kt-section">
                        <div className="kt-section__content d-flex">
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
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <Button type="submit"  style={btnColor} onClick={()=>this.moveToAdjPage("miteraInfoCDI")}>
                           see data in CDI
                          </Button>
                    </div>
                </div>
              </div>
            </>
          </div>
        )
    }
}

