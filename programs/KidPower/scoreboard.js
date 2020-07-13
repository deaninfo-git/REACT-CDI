import React, { Component } from "react";
import { Form, Col, Dropdown } from "react-bootstrap";
import { Button } from "@material-ui/core";
import ScoreboardTable from "./scoreboardTable";
import { getSessions, fetchDataWithPagination } from "../../../crud/auth.crud";
import swal from "sweetalert";
import Pagination from "react-js-pagination";

const btnColor = {
  backgroundColor: "#f4b53f",
  border: "none",
  color: "#fff",
};
function getItem(key){
  return JSON.parse(localStorage.getItem(key))
}
const debounce = (fn, delay) => {
  let timer = null;
  return function(...args) {
    const context = this;
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
};

export default class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sessions: [],
      sessionName: "", total: null,
      per_page: null,
      current_page: 1,tableData:[],session_dateId:"",searchTxt:"", loader: true
    };
    this.getScore = debounce(this.getScore, 200);
  }

  async componentDidMount() {
    await this.getAllSessions();
    await this.getScore()
  }

  

  getScore=async()=>{
    const{current_page,session_dateId,searchTxt}=this.state;
    if(session_dateId)
    try {
      let result = await fetchDataWithPagination("program-scorecard",current_page,{program_id:getItem("progName").id,date_id:session_dateId,child_name:searchTxt})
      if (result.status === 200) {
        this.setState({
          tableData: result.data.data.data,
          current_page: result.data.data.current_page,
        total: result.data.data.total,
        per_page: result.data.data.per_page,loader:false
        });
      } else {
        this.setState({loader:false})
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      this.setState({loader:false})
      swal("Oops!", "Network Error!", "error");
    }
  }

  getAllSessions = async () => {
    try {
      let result = await getSessions();
      console.log("program result", result);
      if (result.status === 200) {
        this.setState({
          sessions: result.data.data,
          sessionName: result.data.data[0].dateName,
          session_dateId:result.data.data[0].dateID
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };
  onChangeHandle = (e) => {
    console.log("e", JSON.parse(e));
    let obj = JSON.parse(e);
    this.setState({ sessionName: obj.name,session_dateId: obj.id },()=>this.getScore());
  };

  handlePageChange = (pageNumber) => {
    this.setState({ current_page: pageNumber });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.current_page !== this.state.current_page) {
      this.getScore();
    }
  }

  searchHandle=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>this.getScore())
  }


  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;}
  };

  render() {
    const { sessions, sessionName } = this.state;
    console.log("sesss", sessionName);
    return (
      <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Kid Power Scorecard</h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                      <div className="d-flex ">
                        <span className="py-1">Semester</span>
                        <span className="px-4">
                          <Dropdown onSelect={this.onChangeHandle} >
                            <Dropdown.Toggle
                              variant="warning"
                              id="dropdown-basic"
                              size="sm"
                              style={{ color: "#fff" }}
                            >
                              {sessionName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                            style={{overflowY: 'scroll', maxHeight:"240px" }}
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
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content text-center">
                      <Form.Row>
                        <Col md={10}>
                          <div class="input-group md-form form-sm form-2 pl-0">
                            <input
                              class="form-control my-0 py-1 amber-border"
                              type="text"
                              placeholder="Search  by First Name"
                              aria-label="Search"
                              name="searchTxt"
                              onChange={this.searchHandle}
                            />
                            <div class="input-group-append">
                              <span
                                class="input-group-text amber lighten-3"
                                id="basic-text1"
                              >
                                <i
                                  class="fas fa-search text-grey"
                                  aria-hidden="true"
                                ></i>
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col md={2}>
                          <Button
                            style={btnColor}
                          >
                            Search
                          </Button>
                        </Col>
                      </Form.Row>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content text-center">
                    { this.state.loader ? <div
              className="spinner-border text-warning loaderStyleMiteraPdf"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div> :   <ScoreboardTable
                       {...this.props.history}
                       tableData={this.state.tableData}
                       getScore={this.getScore}
                    /> }
                    </div>
                  </div>
                </div>
              { this.state.total > 10 ? <Pagination
                  activePage={this.state.current_page}
                  itemsCountPerPage={10}
                  totalItemsCount={this.state.total}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  itemClass="page-item"
                  linkClass="page-link"
                /> : null}
              </div>
            </div>
          </div>
        </>
      </div>
      // </div>
    );
  }
}
