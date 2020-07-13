import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { callApi } from "../../../crud/auth.crud";
import swal from "sweetalert";
import SubjectReportDetailTable from './subjectReportDetailTable'

class SubjectReportsDetails extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             loader:true,tableData:[]
        }
    }
    
    async componentDidMount() {
        await this.getDetails()
    }

    getDetails=async()=>{
        let payload= this.props.location.state;
        if(payload.child_id)
      try {
        let result = await callApi("subject-report-detail",payload);
        if (result.status === 200) {
          console.log('thos',result.data.success)
          let DATA= result.data.success
          this.setState({
             tableData:DATA,
             loader:false
          })
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
        console.log('ths.props',this.props)
        return (
            <div className="col-md-8">
            <>
              <div className="kt-portlet kt-portlet--height-fluid">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">Subject Minutes </h3>
                  </div>
                </div>
                <div className="kt-portlet__body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="kt-section">
                        <div className="kt-section__content text-center">
                        { this.state.loader ?  <div
                  className="spinner-border text-warning loaderStylegraduatePdf"
                  role="status"
                >
                  <span className="sr-only">Loading...</span>
                </div> :       <SubjectReportDetailTable 
                           tableData={this.state.tableData}
                        /> }
                        </div>
                      </div>
                    </div>
                  </div>
                 
                </div>
              </div>
            </>
          </div>
        )
    }
}

export default withRouter(SubjectReportsDetails)
