import React, { Component } from "react";
import PrintoutSheetTable from "./printoutSheetTable";
import { Form, Container, Col } from "react-bootstrap";
import { callApi } from "../../../crud/auth.crud";
import swal from "sweetalert";

export default class PrinoutSheet extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             tableData:[],loader:true
        }
    }
    

  async componentDidMount() {
    this.getData();
  }

  getData = async () => {
    let payload = this.props.location.state;
    try {
      let result = await callApi("session-semester-printout", payload);
      console.log("program result", result);
      if (result.status === 200) {
        console.log("show data beyond limit", result.data.data);
        let DATA=result.data.data
        if(DATA && DATA.length)
       { this.setState({tableData: result.data.data,loader:false})}
       else{
        this.setState({loader:false}) 
       }
      } else {
        this.setState({loader:false}) 
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
        this.setState({loader:false}) 
      swal("Oops!", "Network Error!", "error");
    }
  };

  render() {
    console.log("check history props", this.state);
    const {tableData}=this.state
    return (
        <>
       { this.state.loader ? <div
              className="spinner-border text-warning loaderStyleSessionSem"
              role="status"
            >
              <span className="sr-only">Loading...</span>
            </div> :  <div className="col-md-8">
       
          { tableData && tableData.length>0 ? tableData.map ((el)=>
           <div className="kt-portlet">
        <div className="kt-portlet__body">  
         <div className="row" key={el.mentor_id}>
          <div className="col-md-12">
            <div className="kt-section">
              <div className="kt-section__content">
                <h5 className="borderDown">{el.mentor_name}</h5>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="kt-section">
              <div className="kt-section__content">
                <PrintoutSheetTable data={el.kids}/>
              </div>
            </div>
          </div>
          <div className="kt-section">
            <div className="kt-section__content">
              <Container>
                <Form.Row>
                  <Col md={4}>
                    <span className="font-weight-bold">A-</span>
                    <span className="">Student is Present</span>
                  </Col>
                  <Col md={4}>
                    <span className="font-weight-bold">P-</span>
                    <span className="">Student is Participating</span>
                  </Col>
                  <Col md={4}>
                    <span className="font-weight-bold">B1-</span>
                    <span className="">fair behaviour</span>
                  </Col>
                  <Col md={4}>
                    <span className="font-weight-bold">B2-</span>
                    <span className="">Good behaviour</span>
                  </Col>
                  <Col md={4}>
                    <span className="font-weight-bold">B3-</span>
                    <span className="">EXcellent Behaviour</span>
                  </Col>
                </Form.Row>
              </Container>
            </div>
          </div>
        </div></div>
        </div>
          ) : <div className="col-md-8">
       
          <div className="kt-portlet">
       <div className="kt-portlet__body">  
        <div className="row">
         <div className="col-md-12">
           <div className="kt-section">
             <div className="kt-section__content">
               <h5 className="borderDown">No Data</h5>
             </div>
           </div>
         </div>
       </div></div>
       </div> </div> }
          
      </div>}</>
    );
  }
}
