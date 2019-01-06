import React, { Component } from 'react';
import CompanyForm from '../forms/CompanyForm';
import OfficeForm from '../forms/OfficeForm';
import CardBoard from '../cardboards/CardBoardComp';
import { connect } from "react-redux";
import { getCompany } from "../../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    getCompany: company => dispatch(getCompany(company))
  };
}

class OverviewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      companyList: [],
      show: false
    }
 
  }

  componentDidMount() {
    this.fetchCompany()
  }

  fetchCompany() {
    fetch('http://localhost:8000/API/forms/company', {
        method: "GET"
      })
      .then(res => res.json())
      .then(res => {
        //Store response json to redux
         this.props.getCompany(res.CompanyForm)

        //Store response json to this state
        this.setState({
          companyList: res.CompanyForm
        })
        
        //Checking for if there is company or not
        if(this.state.companyList.length !== 0){
          this.setState ({
            show : true
          })
        }
       
      })
  }


  render() {
   
    console.log(this.state.show)
    const Blank =  <p className='blank text-center'>There is no company created yet</p>
    
    return (
      <div className="App">
      <div className="Form">
      <div className="box-border col-sm-6">
           <CompanyForm></CompanyForm>
      </div>
      <div className="box-border col-sm-6">
          <OfficeForm showCompany = {this.fetchOption}></OfficeForm>
      </div>
      <hr></hr>
      <div className="overview col-sm-12">
      <h1 className='text-left'>Company List</h1>
            { this.state.show ?
            <CardBoard/> :  Blank}
      </div>
      </div>
      </div>
    );
  }
}

const Company = connect(null, mapDispatchToProps)(OverviewPage);
export default Company;
