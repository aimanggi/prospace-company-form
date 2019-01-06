import React, { Component } from 'react';
import { connect } from "react-redux";
import { addCompany } from "../../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    addCompany: company => dispatch(addCompany(company))
  };
}

class CompanyForm extends Component {
        constructor(props) {
            super(props);
            this.state = {
              name: '',
              address: '',
              revenue: '',
              phoneCode: '',
              phoneNumber: '',
              isCreated: false,
              isDuplicated: false
              
            };
            console.log(this.state)
           this.createCompany = this.createCompany.bind(this) 
        }

    
        handleName(text){
            this.setState({ name:text.target.value })  
         }
         handleAddress(text){
            this.setState({ address:text.target.value })  
         }
         handleRevenue(num) {
            let obj = {}
            obj[num.target.name] = typeof num.target.value !== 'number' ? parseInt(num.target.value) : num.target.value
            this.setState(obj);  
          }
          handlePhoneCode(num) {
            let obj = {}
            obj[num.target.name] = typeof num.target.value !== 'number' ? parseInt(num.target.value) : num.target.value
            this.setState(obj);  
          }
          handlePhoneNumber(num) {
            let obj = {}
            obj[num.target.name] = typeof num.target.value !== 'number' ? parseInt(num.target.value) : num.target.value
            this.setState(obj);  
          }

            createCompany = (e) => {
            e.preventDefault();
            const form  = this.state
            this.props.addCompany(form);
            console.log(this.state);
            let obj = {}
            obj.name = this.state.name;
            obj.address = this.state.address;
            obj.revenue = this.state.revenue;
            obj.phoneCode = this.state.phoneCode;
            obj.phoneNumber = this.state.phoneNumber;
            let id = obj.name.replace(/\s+/g, '-').toLowerCase()

            fetch('http://localhost:8000/API/forms/company', {
        
                    method: 'POST',
                    headers: {
                            'Content-Type': 'application/json',
                            },
                    body: JSON.stringify(
                            {
                                "companyId": id,
                                "name": obj.name,
                                "address": obj.address,
                                "revenue": obj.revenue,
                                "phoneCode": obj.phoneCode,
                                "phoneNumber": obj.phoneNumber,
                            }),
                })
                // Company validation
                .then((response) => {
                  if(response.ok){
                    this.setState({ 
                      isCreated:true,
                      isDuplicated: false
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
                      isDuplicated: true
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
              address: '',
              revenue: '',
              phoneCode: '',
              phoneNumber: '',
              isCreated: false,
              isDuplicated: false
              
           })
           console.log(this.state)
          }

  render() {
    // For company warning
    const isCreated = this.state.isCreated;
    let isCreatedWarn;
    if (isCreated) {
      isCreatedWarn = <p className= 'warn'> Company Created Successfully</p>
        }
    const isDuplicated = this.state.isDuplicated;
    let isDuplicatedWarn;
    if (isDuplicated) {
            isDuplicatedWarn = <p className= 'warn duplicated'> This Company Has Been Added Before</p>
        }

    return (
      <div className="from company">
      <div className="Form Title">
            <h2>Create Company</h2>
      </div>

      {/* FORM START HERE */}
      <form onSubmit={(e) => { this.createCompany(e);}}>
          {/* Name form */}
         <div className="input-office form-group col-sm-12">
                <label htmlFor="inputName">Name</label>
                <input
                    value = {this.state.name} 
                    onChange={(text) => {this.handleName(text)}} 
                    className="form-control"  
                    placeholder="Company Name"/>
        </div>
            {/* Address form */}
         <div className="form-row">
            <div className="form-group col-md-12">
                 <label htmlFor="inputEmail4">Address</label>
                 <input
                  value= {this.state.address} 
                    onChange={(text) => {this.handleAddress(text)}}  
                    className="form-control"  
                    placeholder="Address"/>
             </div>
           
        </div>
            {/* Revenue form */}
        <div className="input-office form-group col-md-12">
                <label htmlFor="revenue">Revenue</label>
                <input 
                    value= {this.state.revenue}
                    name="revenue"
                    onChange={(num) => {this.handleRevenue(num)}}
                    type="number" 
                    min='0'
                    className="form-control"  
                    placeholder="Revenue" />
        </div>
            {/* Phone form */}
         <div className="form-row">
            {/* Code area form */}
            <div className="form-group col-md-3">
                 <label htmlFor="inputEmail4">Phone</label>
                 <input
                    value= {this.state.phoneCode}
                    name="phoneCode"
                    onChange={(num) => {this.handlePhoneCode(num)}} 
                    type="number" 
                    min='0'
                    className="inputlatitude form-control"  
                    placeholder="Code"/>
             </div>
            {/* Phone number form */}
             <div className="form-group col-md-9">
                 <label id="none" htmlFor="inputPassword4">Phone</label>
                 <input
                    value= {this.state.phoneNumber}
                    name="phoneNumber"
                    onChange={(num) => {this.handlePhoneNumber(num)}} 
                    type="number" 
                    min='0'
                    className="inputlongitude form-control" 
                    placeholder="Phone Number"/>
            </div>
        </div>
        {isCreatedWarn}
        {isDuplicatedWarn}
        <button type="submit" className="create btn btn-dark btn-lg btn-block">Create</button>
    </form>
    {/* FORM END HERE */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state); 
  return {
    company:state.company
  };
}

const Company = connect(mapStateToProps, mapDispatchToProps)(CompanyForm);
export default Company;
