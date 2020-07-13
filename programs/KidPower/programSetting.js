import React, { Component } from 'react'
import {   
Form,} from "react-bootstrap";
export default class ProgramSetting extends Component {

    moveToAdjPage=(pageName)=>{
        this.props.push("/programs/"+pageName)
    }

    render() {
        return (
            <div className="col-md-8">
            <>
            <div className="kt-portlet ">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">Kid Power Settings</h3>
                  </div>
                </div>
           
              </div>
             <div className="kt-portlet">
          <div className="kt-portlet__body">
            <div className="row">
              <div className="col-md-12">
                <div className="kt-section">
                  <div className="kt-section__content">
                    <h5 className="borderDown">Permission Slip</h5>
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
                        <span>&middot;&nbsp; Permission Slip Tracking</span>
                        <span className="px-2">
                          <i className="kt-nav__link-icon flaticon2-contract icon-color" 
                          onClick={()=>this.moveToAdjPage("permissionSlipTracking")} 
                          />
                        </span>
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
                    <h5 className="borderDown">Whoops, I made a mistake tools</h5>
                  </div>
                </div>
              </div>
              <div className="col-md-12 ml-4">
                <div className="kt-section">
                  <div className="kt-section__content">
                    <Form.Row>
                      <span>&middot;&nbsp; Undo a weekly update</span>
                      <span className="px-2">
                        <i className="kt-nav__link-icon flaticon2-contract icon-color" 
                         onClick={()=>this.moveToAdjPage("editWeeklyUpdate")}
                         />
                      </span>
                    </Form.Row>
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
                    <h5 className="borderDown">Mentor Management</h5>
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
                        <span>&middot;&nbsp; Mentor Setup</span>
                        <span className="px-2">
                          <i className="kt-nav__link-icon flaticon2-contract icon-color" 
                          onClick={()=>this.moveToAdjPage("mentorSetup")} 
                          />
                        </span>
                      </Form.Row>
                      <Form.Row>
                        <span>&middot;&nbsp; Mentor to child configuration</span>
                        <span className="px-2">
                          <i className="kt-nav__link-icon flaticon2-contract icon-color" 
                          onClick={()=>this.moveToAdjPage("mentorToChildConfig")} 
                          />
                        </span>
                      </Form.Row>
                    </Form>
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
