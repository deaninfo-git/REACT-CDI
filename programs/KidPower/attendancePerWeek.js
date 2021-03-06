import React, { Component } from 'react'
import {
    Form,
    Col,
    Dropdown,
  } from "react-bootstrap";
  import { Button } from "@material-ui/core";
  import AttendancePerWeekTable from './attendancePerWeekTable'
  import { fetchDataWithPagination,callApi } from "../../../crud/auth.crud";
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
export default class AttendancePerWeek extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData:[],date:"",date_arr:[],total: null,
      per_page: null,
      current_page: 1,searchTxt:"",loader:false
    }
    this.getAttendance = debounce(this.getAttendance, 200);
  }
  
  async componentDidMount() {
    await this.getDates()
    await this.getAttendance();
  }

  getDates = async () => {
    let program_id =getItem("progName").id
    try {
      let result = await callApi("programs-weeklydates",{program_id});
      if (result.status === 200) {
        this.setState({
          date_arr: result.data.data,
             date: result.data.data[0].common_date, /* fetched 1st date from array (common_date is a key name for date) */
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  getAttendance = async () => {
    const{date,current_page,searchTxt}=this.state;
    if (getItem("progName").id && date)
      try {
        let result = await fetchDataWithPagination("weekly-attendance",current_page,{program_id:getItem("progName").id,date,child_name:searchTxt})
        if (result.status === 200) {
           this.setState({ tableData: result.data.data.data,
            current_page: result.data.data.current_page? result.data.data.current_page :1,
          total: result.data.data.total,
          per_page: result.data.data.per_page,
          from: result.data.data.from,
        });
        } else {
          swal("Oops!", "Please try again!", "error");
        }
      } catch {
        swal("Oops!", "Network Error!", "error");
      }
  };

  onChangeHandle = (e) => {
    this.setState({ date :e },()=>this.getAttendance());
  };
  handlePageChange = (pageNumber) => {
    this.setState({ current_page: pageNumber });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.current_page !== this.state.current_page) {
      this.getAttendance();
    }
  }

  searchHandle=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>this.getAttendance())
  }

  download_PDF_Report=async()=>{
    const {date}=this.state;
    await this.setState({loader:true})
    if (getItem("progName").id && date)
    try {
      let result = await callApi("print-program-graduate",{program_id:getItem("progName").id,week:date});
      if (result.status === 200) {
        this.setState({loader:false})
         window.open(result.data.data,"_blank")
      } else {
        this.setState({loader:false})
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      this.setState({loader:false})
      swal("Oops!", "Network Error!", "error");
    }
  }

    render() {
      const {date_arr,date}=this.state
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
                      <div className="d-flex ">
                        <span className="py-2">Date</span>
                        <span className="px-4">
                        <Dropdown onSelect={this.onChangeHandle} >
                            <Dropdown.Toggle
                              variant="warning"
                              id="dropdown-basic"
                              size="sm"
                              style={{ color: "#fff" }}
                            >
                              {date}
                            </Dropdown.Toggle>

                            <Dropdown.Menu 
                            style={{overflowY: 'scroll', maxHeight:"240px" }}
                            >
                              {date_arr &&
                                date_arr.map((el) => (
                                  <Dropdown.Item
                                    eventKey={el.common_date}
                                    key={el.id}
                                  >
                                    {el.common_date}
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
                            <input class="form-control my-0 py-1 amber-border" type="text"
                             placeholder="Search  by name" aria-label="Search"
                             name="searchTxt"
                              onChange={this.searchHandle}
                             />
                            <div class="input-group-append">
                              <span class="input-group-text amber lighten-3" id="basic-text1"><i class="fas fa-search text-grey"
                                aria-hidden="true"></i></span>
                            </div>
                          </div></Col>
                        <Col md={2}>
                        <Button   style={btnColor}>
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
                      <AttendancePerWeekTable tableData={this.state.tableData} from={this.state.from} />
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
              { this.state.loader ?  <div
              className="spinner-border text-warning loaderStylegraduatePdf"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div> :  
             <div className="text-center">
                  <Button
                          style={btnColor}
                          onClick={this.download_PDF_Report}
                        >
                          Print Walk List
                        </Button>
                    </div>}
            </div>
          </div>
        </>
      </div>
        )
    }
}
