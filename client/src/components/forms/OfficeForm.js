import React, { Component } from 'react';
import { connect } from "react-redux";
import { addOffice } from "../../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addOffice: office => dispatch(addOffice(office))
  };
}
class OfficeForm extends Component {
        constructor() {
          super();
          this.state = {
            name: '',
            latitude: '',
            longitude: '',
            startDate: '',
            companyId:'',
            companyList: [],
            isCreated: false
          };
      }

      //Handle ocChange for data input
      handleName(text){
          this.setState({ name:text.target.value })  
      }
     
      handleLatitude(num) {
          let obj = {}
          obj[num.target.name] = typeof num.target.value !== 'number' ? parseInt(num.target.value) : num.target.value
          this.setState(obj);  
        }
      handleLongitude(num) {
          let obj = {}
          obj[num.target.name] = typeof num.target.value !== 'number' ? parseInt(num.target.value) : num.target.value
          this.setState(obj);  
        }

      handleStartDate(text){
          this.setState({ startDate:text.target.value })  
      }

      handleCompanyId(text){
        this.setState({ companyId:text.currentTarget.value })  
    }

  // Submit office
  createOffice = (e) => {
          e.preventDefault();
          const form  = this.state
          this.props.addOffice(form);
          console.log(this.state);
          let obj = {}
          obj.name = this.state.name;
          obj.latitude = this.state.latitude;
          obj.longitude = this.state.longitude;
          obj.startDate = this.state.startDate;
          obj.companyId = this.state.companyId;

          // make slug for officeId
          let id = obj.name.replace(/\s+/g, '-').toLowerCase()
          let param = obj.companyId.replace(/\s+/g, '-').toLowerCase()
          let math = Math.floor(Math.random()*(999-100+1)+100);

          fetch('http://localhost:8000/API/forms/company/'+ param +'/office', {
        
            method: 'POST',
            headers: {
                    'Content-Type': 'application/json',
                    },
            body: JSON.stringify(
                    {
                        "companyId": obj.companyId,
                        "name": obj.name,
                        "latitude": obj.latitude,
                        "longitude": obj.longitude,
                        "startDate": obj.startDate,
                        "officeId": id + "-" + math,
                    }),
        })

          // Office validation
          .then((response) => {
            if(response.ok){
              this.setState({ 
                isCreated:true,
              }) 
             
            return response.json(); 
          
            }
            else{
                throw response;
            }
            
        })
        .catch(err =>{
            this.setState({ 
                isCreated:false,
             })
             console.log(this.state)
             console.log(err)
            })
            
        .then(this.refresh())
        }

         // Form reset
         refresh = () => {
          this.setState({
            name: '',
            latitude: '',
            longitude: '',
            startDate: '',
            companyId: '',
            isCreated: false
            
         })
    
        }

        dropdownSelect(){
          let data = this.props.company;
          return data.map(e => (
            <option key={e.companyId} value={e.companyId}>{e.name}</option>
          ))}

  render() {
    const isCreated = this.state.isCreated;
    let isCreatedWarn;
    if (isCreated) {
      isCreatedWarn = <p className='warn'> Office Created Successfully</p>
        }

    return (
      <div className="Form Company">
      <div className="Form Title">
            <h2>Create Office</h2>
      </div>
    {/* FORM START HERE */}
    <form onSubmit={(e) => { this.createOffice(e);}}>
        {/* Name form */}
         <div className="input-office form-group col-md-12">
            <label htmlFor="inputName">Name</label>
            <input
              value={this.state.name}
              onChange={(text) => {this.handleName(text)}}  
              className="form-control" 
              id="inputName" 
              placeholder="Office Name"
              required/>
        </div>
        {/* Location Form */}
         <div className="form-row">
            <div className="form-group col-md-6">
                 <label htmlFor="inputEmail4">Location</label>
                 {/* Latitude Form */}
                 <input
                    value={this.state.latitude}
                    name="latitude"
                    onChange={(num) => {this.handleLatitude(num)}}  
                    type="number" 
                    min='0'
                    className="inputlatitude form-control" 
                    id="inputEmail4" 
                    placeholder="Latitude"
                    required/>
             </div>
           
             <div className="form-group col-md-6">
                 <label id="none" htmlFor="inputPassword4">Password</label>
                 {/* Longitude Form */}
                 <input
                    value={this.state.longitude}
                    name="longitude"
                    onChange={(num) => {this.handleLongitude(num)}}   
                    type="number" 
                    min='0'
                    className="inputlongitude form-control" 
                    id="inputlaongitude" 
                    placeholder="Longitude"
                    required/>
            </div>
        </div>
        {/* Office start date form */}
        <div className="input-office form-group col-md-12">
            <label htmlFor="inputDate">Office Start Date</label>
            <input
              value={this.state.startDate}
              onChange={(text) => {this.handleStartDate(text)}} 
              type="date" 
              className="form-control" 
              id="inputDate" 
              required/>
        </div>
        
        {/* Company selection */}
       <div className="input-office form-group col-md-12">
             <label htmlFor="inputCompany">Company</label>
              <select 
              onChange={(text) => {this.handleCompanyId(text)}} 
              value={this.state.companyId}
              id="inputCompany" 
              className="form-control"
              required>
              <option value="">Select Company</option>
               {this.dropdownSelect()}
              </select>
        </div>
        {isCreatedWarn}
        <button className="create office btn btn-dark btn-lg btn-block">Create</button>
    </form>
    {/* FORM END HERE */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    company:state.company
  };
}

const Office = connect(mapStateToProps, mapDispatchToProps)(OfficeForm);
export default Office;
