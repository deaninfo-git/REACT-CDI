import React, { Component } from 'react'
import {
  Form,
  Col,
  Dropdown, Row
} from "react-bootstrap";
import { Button } from "@material-ui/core";
import SettingSlipTrackingTable from './settingSlipTrackingTable'
import { callApi } from '../../../crud/auth.crud'
import swal from "sweetalert";

const btnColor = {
  backgroundColor: "#f4b53f",
  border: "none",
  color: "#fff", textTransform: "unset"
};

function getItem(key) {
  return JSON.parse(localStorage.getItem(key))
}

function removeDuplicates(arr) {
  var i, tmp;
  for (i = 0; i < arr.length; i++) {
    tmp = arr.lastIndexOf(arr[i]);
    if (tmp === i) {
      //Only one of this number
    } else {
      //More than one
      arr.splice(tmp, 1);
      arr.splice(i, 1);
    }
  }
}



export default class PermissionSlipTracking extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dates: [],
      dateName: "",
      dateID: "", tableData: [], kid_list: [], permission_slip_id: "999999",p_slips:[],
      heading:""
    }
  }
  async componentDidMount() {
    await this.getPermissionSlip()
    await this.getDates()
    //  await this.getDatesList()
  }


  getDates = async () => {
    //  let program_id = getItem('progName').id;
    //  if(program_id)
    try {
      let result = await callApi("permission-slip-dates");
      console.log("program result", result.data.data);
      if (result.status === 200) {
        this.setState({
          dates: result.data.data,
          dateName: result.data.data[0].date_name,
          dateID: result.data.data[0].date_id
        }, () => this.getDatesList());
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  onChangeHandle = (e) => {
    let obj = JSON.parse(e);
    this.setState({ dateName: obj.name, dateID: obj.id }, () => this.getDatesList());
  };
  getDatesList = async () => {
    let program_id = getItem('progName').id;
    const { dateID, permission_slip_id } = this.state;
    if (program_id && dateID && permission_slip_id)
      try {
        let result = await callApi("permission-slip-program", { program_id, date_id: dateID, permission_slip_id });
        console.log("program result", result.data);
        if (result.status === 200) {
          this.setState({
            tableData: result.data.data,
            kid_list: result.data.kid_list,
            heading:result.data.heading,
            child_id_arr: result.data.selected_kids
          });
        } else {
          swal("Oops!", "Please try again!", "error");
        }
      } catch {
        swal("Oops!", "Network Error!", "error");
      }
  };

  onChangeHandle = (child) => {
    console.log('clicked', child)
    let cArr = [...this.state.child_id_arr]
    cArr.push(child)
    removeDuplicates(cArr)
    this.setState({ child_id_arr: cArr })
  }

   getPermissionSlip=async()=>{
     let program_id=getItem('progName').id
     if(program_id)
    try {
      let result = await callApi("permission-slip-list",{program_id});
      console.log("program 123", result.data.data);
      if (result.status === 200) {
        this.setState({
          p_slips: result.data.data,
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
   }


  submitPermissionSlip = async () => {
    let program_id = getItem('progName').id;
    const { dateID, kid_list, child_id_arr, permission_slip_id } = this.state;
    if (program_id && dateID && permission_slip_id)
      try {
        let result = await callApi("permission-slip-update",
          { program_id, date_id: dateID, kids_list: kid_list.join(), 
            permission_slip_id,
            permission_slip: child_id_arr.join() });
        console.log("program result", result.data);
        if (result.status === 200) {
          this.getDates();
          swal("Updated Successfully", "", "success")
        } else {
          swal("Oops!", "Please try again!", "error");
        }
      } catch {
        swal("Oops!", "Network Error!", "error");
      }
  }

  slipHandler=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>this.getDatesList())
  }


  render() {
    const { dates, tableData, permission_slip_id, p_slips,heading } = this.state;
    console.log('this.state', this.state.permission_slip_id)
    return (
      <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Permission Slip Tracking</h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                      <div className="d-flex ">
                        <span className="py-2">Year</span>
                        <span className="px-4">
                          <Dropdown onSelect={this.onChangeHandle} >
                            <Dropdown.Toggle
                              variant="warning"
                              id="dropdown-basic"
                              size="sm"
                              style={{ color: "#fff" }}
                            >
                              {this.state.dateName}
                            </Dropdown.Toggle>

                            <Dropdown.Menu
                              style={{ overflowY: 'scroll', maxHeight: "240px" }}
                            >
                              {dates &&
                                dates.map((el, i) => (
                                  <Dropdown.Item
                                    eventKey={JSON.stringify({
                                      name: el.date_name,
                                      id: el.date_id,
                                    })}
                                    key={i}
                                  >
                                    {el.date_name}
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
                    <div className="kt-section__content">
                      <div className="d-flex ">
                        <span className="py-2">Slip</span>
                        <span className="px-4">
                          <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                            {/* <Form.Label column sm={4}>
                    Ethnicity
                    </Form.Label> */}
                            <Col sm={12}>
                              <Form.Control
                                as="select"
                                required
                                value={permission_slip_id}
                                name="permission_slip_id"
                                onChange={this.slipHandler}
                              >
                                <option value="999999">Participation</option>
                                <option value="999990">Sharing</option>
                                {
                                  p_slips && p_slips.map((el,i)=><option value={el.id}>{el.name}</option>)
                                }
                              </Form.Control>
                            </Col>
                          </Form.Group>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content text-center">
                      <Form.Row>
                        <Col md={12}>
                          <p>{heading}</p>
                        </Col>
                      </Form.Row>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content text-center">
                      <SettingSlipTrackingTable tableData={tableData}
                        onChangeHandle={this.onChangeHandle}
                        child_id_arr={this.state.child_id_arr} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <Button type="submit" style={btnColor} onClick={this.submitPermissionSlip}>
                  Update the CDI
                      </Button>
              </div>
            </div>
          </div>
        </>
      </div>
    )
  }
}
