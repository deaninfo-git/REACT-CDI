import React, { Component } from 'react'
import {
  Button
  } from "react-bootstrap";
  const btnColor = {
    backgroundColor: "#f4b53f",
    border: "none",
  };

  function getItem(key){
    return JSON.parse(localStorage.getItem(key))
  }

export default class MiteraActivity extends Component {

    moveToAdjPage=(pageName)=>{
        this.props.push("/progList/"+pageName)
    }

    render() {
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
                        <div className="kt-section__content">
                            <span>Choose your update activity</span>
                           <div className="py-2">
                           <Button type="submit" style={btnColor} onClick={()=>this.moveToAdjPage("weeklyUpdate")}>
                           Enter a weekly update
                          </Button>
                               </div> 
                          
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="kt-section">
                        <div className="kt-section__content">
                            <span>Change or fix previous updates</span>
                           <div className="py-2">
                          <span> <Button type="submit" style={btnColor} onClick={()=>this.moveToAdjPage("adjustPreviousUpdate")}>
                           Adjust Previous Update
                          </Button>
                          </span>
                          <span> <Button type="submit" style={btnColor} onClick={()=>this.moveToAdjPage("changeDate")}>
                           Fix Submitted wrong date
                          </Button>
                          </span>
                               </div> 
                          
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
