import React, { Component } from 'react'
import {Form} from "react-bootstrap";
import { callApi } from "../../../crud/auth.crud";
import swal from "sweetalert";
import './mitera.css'
  
function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}
export default class MiteraReports extends Component {
  constructor(props) {
    super(props)
    this.state = {
       stats:[]
    }
  }
  async componentDidMount() {
    await this.getReportStats();
  }

  getReportStats = async () => {
    let program_id = getItem("progName").id
    if (program_id)
      try {
        let result = await callApi("program-report",{program_id});;
        if (result.status === 200) {
           this.setState({stats:result.data.data});
        } else {
          swal("Oops!", "Please try again!", "error");
        }
      } catch {
        swal("Oops!", "Network Error!", "error");
      }
  };
    moveToAdjPage=(pageName)=>{
      
            this.props.push("/progList/"+pageName)
    
    }
    render() {
      const {stats}=this.state;
      let pname=getItem("progName").name
        return (
            <div className="col-md-8">
            {/* <div className="kt-section"> */}
            <>
              <div className="kt-portlet ">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title"> {pname} Reports</h3>
                  </div>
                </div>
           
              </div>
            </>
            <div className="kt-portlet">
          <div className="kt-portlet__body">
            <div className="row">
              <div className="col-md-12">
                <div className="kt-section">
                  <div className="kt-section__content">
                    <h5 className="borderDown">Key Stats</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-12 ml-4">
                <div className="kt-section">
                  <div className="kt-section__content">
                    <Form
                      // onSubmit={handleSubmit}
                     
                    >
                       <Form.Row>
                        { stats && stats.map((el,i)=>
                        <React.Fragment key={i}>
                          <span className="col-md-6">
                          {el.details}
                        </span>
                        <span className="col-md-6 px-5">{el.count}</span>
                        </React.Fragment>
                        )
                        }
                      </Form.Row>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
            <div className="kt-portlet">
          <div className="kt-portlet__body">
            <div className="row">
              <div className="col-md-12">
                <div className="kt-section">
                  <div className="kt-section__content">
                    <h5 className="borderDown">Custom Reports</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-12 ml-4">
                <div className="kt-section">
                  <div className="kt-section__content">
                    <Form
                      // onSubmit={handleSubmit}
                     
                    >
                      <Form.Row>
                      <span>&middot;&nbsp; Attendance Per Week for {pname}</span>
                        <span className="px-2">
                          <i className="kt-nav__link-icon flaticon2-contract icon-color" onClick={()=>this.moveToAdjPage("attendancePerWeek")} />
                        </span>
                      </Form.Row>
                      <Form.Row>
                        <span>&middot;&nbsp; Weekly Prinouts for {pname}(mostly used by PrimeTime junior)</span>
                        <span className="px-2">
                          <i className="kt-nav__link-icon flaticon2-contract icon-color" onClick={()=>this.moveToAdjPage("printoutAttendance")} />
                        </span>
                      </Form.Row>
                      <Form.Row>
                        <span>&middot;&nbsp; walk list for {pname} in PT</span>
                        <span className="px-2">
                          <i className="kt-nav__link-icon flaticon2-contract icon-color" onClick={()=>this.moveToAdjPage("walkList")}/>
                        </span>
                      </Form.Row>
                     { getItem('progName').id < 11 ? <Form.Row>
                        <span>&middot;&nbsp; upcoming {pname} Graduates</span>
                        <span className="px-2">
                          <i className="kt-nav__link-icon flaticon2-contract icon-color" 
                            onClick={()=>this.moveToAdjPage("graduates")}
                          />
                        </span>
                      </Form.Row> : null}
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
          
          </div>
        )
    }
}
