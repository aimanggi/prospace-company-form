import React, { Component } from 'react';

import { connect } from "react-redux";

class OverviewPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCompany: []
    }

  }

  componentDidMount() {
    this.fetchCompany()
  }

  fetchCompany() {
    fetch('http://localhost:8000/API/forms/company/' + this.props.params, {
        method: "GET"
      })
      .then(res => res.json())
      .then(res => {

        //Store response json to this state
        this.setState({
          currentCompany: res.companyForm
        })
        console.log(res.companyForm)
      })

  }

  render() {
    console.log(this.state.currentCompany)
    console.log(this.props)
    return (
        <div className="box-card comp col-sm-12">
        <div className="card">
        <div className="card-header">
        <h3> {this.state.currentCompany.name} </h3>
        </div>
        <div className="card-body">
        <p className="card-text">Address : <span>{this.state.currentCompany.address}</span></p>
        <p className="card-text">Revenue : <span>{this.state.currentCompany.revenue}</span></p>
        <p className="card-text">Phone : <span>({this.state.currentCompany.phoneCode}) {this.state.currentCompany.phoneNumber}</span></p>
        </div>
      </div>
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

const Company = connect(mapStateToProps)(OverviewPage);
export default Company;
