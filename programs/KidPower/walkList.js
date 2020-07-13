import React, { Component } from "react";
import { Button } from "react-bootstrap";
import WalkListTable from "./walkListTable";
import WalkListTable2 from "./walkListTable2";
import { fetchDataWithPagination,callApi } from "../../../crud/auth.crud";
import swal from "sweetalert";
import Pagination from "react-js-pagination";

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

const btnColor = {
  backgroundColor: "#f4b53f",
  border: "none",
};
export default class WalkList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData:[],total: null,
      per_page: null,
      current_page: 1,tableData2:[],total2:null,per_page2:null,current_page2:1,
      loader:false
    }
  }

    async componentDidMount() {
        await this.getWalkList();
        await this.getNotIn_WalkList();      
    }


  getWalkList = async () => {
    const { current_page } = this.state;
    if (getItem("progName").id)
      try {
        let result = await fetchDataWithPagination("walk-list",current_page,{program_id:getItem("progName").id}) 
        if (result.status === 200) {
          this.setState({
            tableData: result.data.data.data,
            current_page: result.data.data.current_page
              ? result.data.data.current_page
              : 1,
            total: result.data.data.total,
            per_page: result.data.data.per_page,
          });
        } else {
          swal("Oops!", "Please try again!", "error");
        }
      } catch {
        swal("Oops!", "Network Error!", "error");
      }
  };

  getNotIn_WalkList = async () => {
    const { current_page2 } = this.state;
    if (getItem("progName").id)
      try {
        let result = await fetchDataWithPagination("notin-walk-list",current_page2,{program_id:getItem("progName").id})
        if (result.status === 200) {
          this.setState({
            tableData2: result.data.data.data,
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

  download_PDF=async()=>{
    await this.setState({loader:true})
    if (getItem("progName").id)
    try {
      let result = await callApi("print-walk-list",{program_id:getItem("progName").id});
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

  handlePageChange = (pageNumber) => {
    this.setState({ current_page: pageNumber });
  };

  handlePageChange2 = (pageNumber) => {
    this.setState({ current_page2: pageNumber });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.current_page !== this.state.current_page) {
      this.getWalkList();
    }
    if (prevState.current_page2 !== this.state.current_page2) {
      this.getNotIn_WalkList();
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
                <h3 className="kt-portlet__head-title">
                 Kid Power Walk List
                </h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                     <div className="text-center"> <h5 className="kt-portlet__head-title">In walk List </h5></div>
                      <WalkListTable tableData={this.state.tableData}/>
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
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                      <div className="text-center">
                      { this.state.loader ?  <div
              className="spinner-border text-warning loaderStyleKidPdf"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div> :  <Button
                          style={btnColor}
                          onClick={this.download_PDF}
                        >
                          Print Walk List
                        </Button>}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                    <div className="text-center"> <h5 className="kt-portlet__head-title">Not In walk List </h5></div>
                      <WalkListTable2 tableData={this.state.tableData2}/>
                    </div>
                  </div>
                </div>
                { this.state.total2 > 10 ? <Pagination
                  activePage={this.state.current_page2}
                  itemsCountPerPage={10}
                  totalItemsCount={this.state.total2}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange2.bind(this)}
                  itemClass="page-item"
                  linkClass="page-link"
                /> : null}
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
