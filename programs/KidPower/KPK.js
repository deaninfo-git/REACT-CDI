import React, { Component } from 'react'
import {
  
    Form,
    Col,
   
  } from "react-bootstrap";
  import { Button } from "@material-ui/core";
  import KPKTable from './KPKTable'
  
  const btnColor = {
    backgroundColor: "#f4b53f",
    border: "none",
    color: "#fff",
  };
export default class KPK extends Component {
    render() {
        return (
            <div className="col-md-8">
            <>
            <div className="kt-portlet kt-portlet--height-fluid">
              <div className="kt-portlet__head">
                <div className="kt-portlet__head-label">
                  <h3 className="kt-portlet__head-title">Mentor to kid Relationship for kid Power</h3>
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
                              <input class="form-control my-0 py-1 amber-border" type="text" placeholder="Search  by name" aria-label="Search" />
                              <div class="input-group-append">
                                <span class="input-group-text amber lighten-3" id="basic-text1"><i class="fas fa-search text-grey"
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
                        <KPKTable/>
                      </div>
                    </div>
                  </div>
                
                </div> 
                 <div className="text-center">
                  <Button type="submit" style={btnColor}>
                         Update
                        </Button>
                  </div>
              </div>
            </div>
          </></div>
        )
    }
}
