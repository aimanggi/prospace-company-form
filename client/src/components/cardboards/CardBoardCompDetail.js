import React, { Component } from 'react';
import { connect } from "react-redux";
import {
  Link
} from "react-router-dom";

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

  //Get data current company, using parameter in URL
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
    return (
        <div className="box-card comp col-sm-12">
        <div className="card">
        <div className="card-header">
        <h3> {this.state.currentCompany.name} </h3>
        </div>
        <div className="card-body">
        <p className="card-text"><b>Address : </b><span>{this.state.currentCompany.address}</span></p>
        <p className="card-text"><b>Revenue : </b><span>{this.state.currentCompany.revenue}</span></p>
        <p className="card-text"><b>Phone : </b><span>({this.state.currentCompany.phoneCode}) {this.state.currentCompany.phoneNumber}</span></p>
        </div>
        <Link to="/" class="btn btn-outline-secondary backhome">Back to company list</Link>
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
