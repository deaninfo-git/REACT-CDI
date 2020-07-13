import React, { Component } from 'react'
import {Dropdown} from "react-bootstrap";
  import { Button } from "@material-ui/core";
  import PermissionSlipTrackingTable from './permissionSlipTrackingTable'
  import {callApi} from '../../../crud/auth.crud'
import swal from "sweetalert";
  const btnColor = {
    backgroundColor: "#f4b53f",
    border: "none",
    color: "#fff",textTransform: "unset"
  };

  function getItem(key){
    return JSON.parse(localStorage.getItem(key))
  }
  

export default class EditWeeklyUpdate extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       dates:[],
       dateName:"",
       uploadID:""
    }
  }
  

 async componentDidMount() {
   await this.getDates()
  //  await this.getDatesList()
 }
 

  getDates = async () => {
    let program_id = getItem('progName').id;
    if(program_id)
    try {
      let result = await callApi("getdate-fixwrongdates",{program_id});
      console.log("program result", result.data.data);
      if (result.status === 200) {
        this.setState({
          dates: result.data.data,
          dateName: result.data.data[0].date,
          uploadID:result.data.data[0].uploadID
        },()=>this.getDatesList());
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  onChangeHandle = (e) => {
    let obj = JSON.parse(e);
    this.setState({ dateName: obj.name,uploadID: obj.id },()=>this.getDatesList());
  };

  getDatesList = async () => {
    let program_id = getItem('progName').id;
    const {uploadID,dateName}=this.state;
    if(program_id && uploadID && dateName)
    try {
      let result = await callApi("fix-wrong-dates",{program_id,upload_id:uploadID, date:dateName});
      console.log("program result", result.data);
      if (result.status === 200) {
        this.setState({
          heading: result.data.data.heading,
          list: result.data.data.list,
        });
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };


    moveToAdjPage=async()=>{
      let program_id = getItem('progName').id;
      const {uploadID}=this.state;
      if(program_id && uploadID)
      try {
        let result = await callApi("undo-weekly-update",{program_id,uploadid:uploadID});
        console.log("program result", result.data);
        if (result.status === 200) {
          swal("Removed Successfully!","","success");
          this.props.push('/programs/programSetting')
        } else {
          swal("Oops!", "Please try again!", "error");
        }
      } catch {
        swal("Oops!", "Network Error!", "error");
      }
    }
    render() {
      const {dates}=this.state;
        return (
          <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">Undo Weekly Update</h3>
              </div>
            </div>
            <div className="kt-portlet__body">
              <div className="row">
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content">
                      <div className="d-flex justify-content-between">
                        {/* <span className="py-1">Semester</span> */}
                        <div className="d-flex ">
                          <span className="py-1 font-weight-bold">Date</span>  
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
                            style={{overflowY: 'scroll', maxHeight:"240px" }}
                            >
                              {dates &&
                                dates.map((el,i) => (
                                  <Dropdown.Item
                                    eventKey={JSON.stringify({
                                      name: el.date,
                                      id: el.uploadID,
                                    })}
                                    key={i}
                                  >
                                    {el.date}
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </span></div>
                        {/* <Button type="submit" style={btnColor} onClick={()=>this.moveToAdjPage("changeDate2")}>
                       Change Date
                      </Button> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content text-center">
                      <PermissionSlipTrackingTable tableData={this.state.list}/>
                    </div>
                  </div>
                </div>
              
              </div>
              <div className="text-center">
                    <Button type="submit" style={btnColor} onClick={this.moveToAdjPage}>
                      Undo this Upload
                      </Button>
                    </div>
            </div>
          </div>
        </>
      </div>
         
        )
    }
}
