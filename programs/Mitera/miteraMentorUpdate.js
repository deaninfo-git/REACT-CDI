import React, { Component } from 'react'
import { Button } from "react-bootstrap";
import EditMentorTable from './editMentorsTable'
import {
  callApi
} from "../../../crud/auth.crud";
import swal from "sweetalert";

const btnColorRed = {
  backgroundColor: "#ef1f2f",
  border: "none",
};

function removeDuplicates(arr) {
  var i, tmp;
  for(i=0; i<arr.length; i++) {
      tmp = arr.lastIndexOf(arr[i]);
      if(tmp === i) {
          //Only one of this number
      } else {
          //More than one
          arr.splice(tmp, 1);
          arr.splice(i, 1);
      }
  }
}

function getItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

export default class MiteraMentorUpdate extends Component {

 constructor(props) {
   super(props)
 
   this.state = {
      tableData:[],
      checked_mentor:this.props.location.state.checked_mentor ? [...this.props.location.state.checked_mentor] :[],
   }
 }
 
  async componentDidMount() {
    await this.getData()
  }
  

 getData = async () => {
   let payload= this.props.location.state
   if(payload.date_id && payload.mentor_list.length)
   try {
     let result = await callApi("edit-other-activity-mentor",payload);
     if (result.status === 200) {
       let DATA= result.data.data;
      //  console.log(DATA,'DATA')
      if(payload.checked_mentor){
        console.log('iff')
        this.setState({
          tableData:DATA,
         });
      }
      else{
        console.log('else',)
        this.setState({
          tableData:DATA,
          checked_mentor:result.data.selected
         });
      }
      
     } 
   } catch {
     swal("Oops!", "Network Error!", "error");
   }
 };
 onChangeHandle=(id)=>{
   let cArr= [...this.state.checked_mentor]
   cArr.push(id)
   removeDuplicates(cArr)
   this.setState({checked_mentor:cArr})
}
    moveToAdjPage = (pageNumber) => {
        let payload= this.props.location.state
        const {checked_mentor}=this.state
        
         if(checked_mentor.length){
        this.props.push({
          pathname: "/progList/" + pageNumber,
          state: {...payload,checked_mentor}
        })
      }
      else{
        swal("Required!", "Please select something!", "error");
      }
      };
    
    render() {
      console.log('props 2',this.props.location.state.checked_mentor,this.state)
        return (
            <div className="col-md-8">
            {/* <div className="kt-section"> */}
            <>
              <div className="kt-portlet kt-portlet--height-fluid">
                <div className="kt-portlet__head">
                  <div className="kt-portlet__head-label">
                    <h3 className="kt-portlet__head-title">{getItem('progName').name} Mentor Update</h3>
                  </div>
                </div>
                <div className="kt-portlet__body">
                  <div className="row">
                   
                  </div>
    
                  <div className="col-md-12">
                      <div className="kt-section">
                        <div className="kt-section__content text-center">
                          <EditMentorTable tableData={this.state.tableData}
                          checked_mentor={this.state.checked_mentor}
                          onChangeHandle={this.onChangeHandle}
                          />
                        </div>
                      </div>
                  <div className="text-center py-4">
                    <Button
                      type="submit"
                      style={btnColorRed}
                      onClick={()=>this.moveToAdjPage("mentorUpdate2")}
                    >
                     Proceed to Next Step
                    </Button>
                  </div>
                    </div>
                  
                </div>
              </div>
            </>
          </div>
        )
    }
}
