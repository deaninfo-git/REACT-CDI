import React, { Component } from 'react'
import {
    Form,
    Col,
  } from "react-bootstrap";
  import { Button } from "@material-ui/core";
  import AttendanceRPMTAble from './attendanceForRPMTable'
  import {getAttendance} from '../../../crud/auth.crud'
  import swal from "sweetalert";
  import Pagination from "react-js-pagination";

  const btnColor = {
    backgroundColor: "#f4b53f",
    border: "none",
    color: "#fff",
  };

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

  function removeDuplicates(arr) {
    var i, tmp;
    for(i=0; i<arr.length; i++) {
        tmp = arr.lastIndexOf(arr[i]);
        if(tmp === i) {
            //Only one of this number
        } else {
            //More than one
            arr.splice(tmp, 1);
            arr.splice(i, 1);
        }
    }
}

  
export default class AttendanceForRPM extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       id:props.location.state.id,total: null,
       per_page: null,
       current_page: 1,program_name:"",child_id_arr:[],loading:true
    }
    this.attendanceList = debounce(this.attendanceList, 200);
  }

  async componentDidMount() {
    this.attendanceList()
  }
  

  attendanceList=async()=>{
    if(!this.state.loading){
      await this.setState({loading:true})
     }
    const {id,searchTxt,current_page}=this.state
    try{
      let result = await getAttendance(current_page,id,searchTxt)
      // console.log('attt',result.data.data)
      if(result.status===200){
        this.setState({tableData:result.data.data.data,
           child_id_arr: result.data.child_list,
          current_page: result.data.data.current_page,
          total: result.data.data.total,
          per_page: result.data.data.per_page,
          program_name:result.data.program_name,loading:false
        })
      }
    }
    catch{
      this.setState({loading:false})
      swal("Oops!", "Network Error!!", "error");
    }
  }

  searchHandle=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>this.attendanceList())
  }

  handlePageChange = (pageNumber) => {
    this.setState({ current_page: pageNumber });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.current_page !== this.state.current_page) {
      this.attendanceList()
    }
  }

  onChangeHandle=(child)=>{
    console.log('clicked',child)
     let cArr= [...this.state.child_id_arr]
     cArr.push(child)
     removeDuplicates(cArr)
     this.setState({child_id_arr:cArr})
}
   
    render() {
      const{program_name,child_id_arr,loading}=this.state;
      console.log('child_id_arr',child_id_arr)
        return (
            <>
            <div className="kt-portlet kt-portlet--height-fluid">
              <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">Attendance for {program_name}</h3>
                </div>
              </div>
              <div className="kt-portlet__body">
                <div className="row">
               
                  <div className="col-md-12">
                    <div className="kt-section">
                      <div className="kt-section__content text-center">
                        <Form.Row>
                          <Col md={10}>
                            <div className="input-group md-form form-sm form-2 pl-0">
                              <input className="form-control my-0 py-1 amber-border" type="text"
                               name="searchTxt"
                               onChange={this.searchHandle}
                              placeholder="Search  by name" aria-label="Search" />
                              <div className="input-group-append">
                                <span className="input-group-text amber lighten-3" id="basic-text1"><i className="fas fa-search text-grey"
                                  aria-hidden="true"></i></span>
                              </div>
                            </div></Col>
                          <Col md={2}>
                          <Button type="submit" style={btnColor}>
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
                      { loading ?    
              <div
                className="spinner-border text-warning dashboardLoading"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div> :          <AttendanceRPMTAble tableData={this.state.tableData}
                        attendanceList={this.attendanceList}
                        onChangeHandle={this.onChangeHandle}
                        child_id_arr={this.state.child_id_arr}
                        program_id={this.state.id}/>}
                      </div>
                    </div>
                  </div>
                  <Pagination
                  activePage={this.state.current_page}
                  itemsCountPerPage={10}
                  totalItemsCount={this.state.total}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange.bind(this)}
                  itemClass="page-item"
                  linkClass="page-link"
                />
                </div>
              </div>
            </div>
          </>
        )
    }
}
