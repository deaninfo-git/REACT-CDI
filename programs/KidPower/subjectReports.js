import React, { Component } from 'react'
import {
    Form,
    Col,
  } from "react-bootstrap";
  import { Button } from "@material-ui/core";
  import SubjectReportTable from './subjectReportTable'
  import { fetchDataWithPagination } from "../../../crud/auth.crud";
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

export default class SubjectReports extends Component {
    constructor(props) {
        super(props)
        this.state = {
          tableData:[],week:"",week_arr:[],total: null,
          per_page: null,
          current_page: 1,searchTxt:"",heading:"",loader:true
        }
        this.getReports = debounce(this.getReports, 200);
      }
      
       async componentDidMount() {
         await this.getReports()
       }
    
      getReports = async (page) => {
          const program_id = getItem('progName').id
          const {searchTxt}=this.state
          if(program_id)
        try {
          let result = await fetchDataWithPagination("subject-report",page ? page : 1,{program_id,child_name:searchTxt});
          if (result.status === 200) {
            console.log('thos',result.data.success)
            let DATA= result.data.success
            this.setState({
               current_page:DATA.current_page,
               tableData:DATA.data,
               per_page:DATA.per_page,
               total:DATA.total,loader:false
            })
          } else {
              this.setState({loader:false})
            swal("Oops!", "Please try again!", "error");
          }
        } catch {
            this.setState({loader:false})
          swal("Oops!", "Network Error!", "error");
        }
      };
    
     
     
    
      handlePageChange = (pageNumber) => {
        this.setState({ current_page: pageNumber });
      };
    
      searchHandle=(e)=>{
        this.setState({[e.target.name]:e.target.value},()=>this.getReports())
      }
    
      componentDidUpdate(prevProps, prevState) {
        if (prevState.current_page !== this.state.current_page) {
          this.getReports(this.state.current_page);
        }
      }
    
    render() {

        return (
            <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Subject Reports </h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
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
                    { this.state.loader ?  <div
              className="spinner-border text-warning loaderStylegraduatePdf"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div> :       <SubjectReportTable 
                       tableData={this.state.tableData}
                       {...this.props.history}
                    /> }
                    </div>
                  </div>
                </div>
                { !this.state.loader && this.state.total > 10 ? <Pagination
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
        )
    }
}
