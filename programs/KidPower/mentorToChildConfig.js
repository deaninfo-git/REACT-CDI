import React, { Component } from "react";
import {
  Form
} from "react-bootstrap";
import ChildConfigTable from './childConfigTable'
import {callApi,fetchDataWithPagination} from '../../../crud/auth.crud'
import swal from "sweetalert";

function getItem(key){
  return JSON.parse(localStorage.getItem(key))
}

export default class MentorToChildConfig extends Component {

constructor(props) {
  super(props)

  this.state = {
    mentors:[],
    // mentorName:"",
    mentorID:"",currently_data:[],previously_data:[],
    mentor_name:"",total: null,
    per_page: null,
    current_page: 1,eligible_data:[]
  }
}


 async componentDidMount() {
   await this.getMentor()
   await this.getChildToMentor()
   await this.getChildToMentorEligible()
 }
 

  getMentor = async () => {
      const program_id= getItem('progName').id
    try {
      let result = await callApi("pick-mentor",{program_id});
      if (result.status === 200) {
        this.setState(
          {
            mentors: result.data.data,
            // mentorName: result.data.data[0].firstName+" "+result.data.data[0].lastName,
            mentorID: result.data.data[0].identifier,
          }
        );
      } else {
        swal("Oops!", "Please try again!", "error");
      }
    } catch {
      swal("Oops!", "Network Error!", "error");
    }
  };

  getChildToMentor = async () => {
    const {mentorID}=this.state
    if(mentorID)
  try {
    let result = await callApi("child-to-mentor",{mentor_id:mentorID});
    if (result.status === 200) {
      this.setState(
        {
         currently_data:result.data.currently,
         previously_data:result.data.previously,
         mentor_name:result.data.mentor_name
        }
      );
    } else {
      swal("Oops!", "Please try again!", "error");
    }
  } catch {
    swal("Oops!", "Network Error!", "error");
  }
};

getChildToMentorEligible = async () => {
  let program_id=getItem('progName').id
  const {current_page}=this.state;
try {
  let result = await fetchDataWithPagination("child-to-mentor-eligible",current_page,{program_id});
  if (result.status === 200) {
    console.log('getctm',result.data.data)
    this.setState(
      {
        eligible_data: result.data.data.data,
        current_page: result.data.data.current_page? result.data.data.current_page :1,
        total: result.data.data.total,
        per_page: result.data.data.per_page
      }
    );
  } else {
    swal("Oops!", "Please try again!", "error");
  }
} catch {
  swal("Oops!", "Network Error!", "error");
}
};

  onChangeHandle=(e)=>{
    this.setState({[e.target.name]:e.target.value},()=>this.getChildToMentor())
  }

 changePage=(page)=>{
   this.setState({current_page:page})
 }

  render() {
    console.log('this.state',this.state)
    const {mentors,mentorID,currently_data,previously_data,mentor_name,
    eligible_data,total,current_page,per_page
    }=this.state;
    console.log('p state',this.state.current_page)
    return (
      <div className="col-md-8">
        {/* <div className="kt-section"> */}
        <>
          <div className="kt-portlet kt-portlet--height-fluid">
            <div className="kt-portlet__head">
              <div className="kt-portlet__head-label">
                <h3 className="kt-portlet__head-title">
                  Mentor to kid Relationship for kid power
                </h3>
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
                          <span className="py-2">Pick Mentor</span>
                          <span className="px-4">
                            <Form.Group>
                              <Form.Control as="select" 
                               name="mentorID" value={mentorID} onChange={this.onChangeHandle}
                              >
                                {
                               mentors && mentors.length ? mentors.map((el)=>
                                    <option value={el.identifier}
                                    key={el.id}
                                    >{el.firstName+" "+el.lastName}</option>
                                  )
                                : <option>Loading Mentors...</option>}
                              </Form.Control>
                            </Form.Group>
                          </span>
                        </div>
                        {/* <Button type="submit" style={btnColor} >
                       Click to add mentor
                      </Button> */}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <div className="kt-section">
                    <div className="kt-section__content text-center">
                      <ChildConfigTable 
                      currently_data={currently_data}
                      previously_data={previously_data}
                      mentor_name={mentor_name}
                      eligible_data={eligible_data}
                      total={total}
                      current_page={current_page}
                      per_page={per_page}
                      changePage={this.changePage}
                      getChildToMentorEligible={this.getChildToMentorEligible}
                      program_name={getItem('progName').name}
                      program_id={getItem('progName').id}
                      mentor_id={this.state.mentorID}
                      getChildToMentor={this.getChildToMentor}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
      // </div>
    );
  }
}
