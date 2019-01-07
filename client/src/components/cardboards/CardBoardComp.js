import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  Link
} from "react-router-dom";


class CardBoard extends Component {
  constructor(props){
    super(props)
      this.handleDelete=this.handleDelete.bind(this)
  }
 
  //Delete company with fetch delete API 
  handleDelete(id) {
    const { deleteCompany } = this.props;
    fetch('http://localhost:8000/API/forms/company/' + id, {
        method: "DELETE"  
      })
      .then(() => deleteCompany(id));
      
      }
  
  // Company card board looping, using data in redux
  companyCardLoop(){
    let data = this.props.company;
    return data.map(e => (
    
        <div  key={e.companyId} className="box-card col-sm-6">
        <div className="icon-exit">
          <button  onClick={(id) => { if (window.confirm('Are you sure want to delete this company?')) this.handleDelete(e.companyId) }} 
                   type="button" 
                   className="icon-x close" 
                   aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>
          <div className="office card">
          <Link to={`/company/${e.companyId}`} >
            <div className="card-header">
              <h3>{e.name}</h3>
            </div>
            </Link>
            <div className="card-body">
              <p className="card-text strong">Name : </p>
                  <p>{e.name}</p>
              <p className="card-text strong">Address :</p>
                  <p>{e.address}</p>
              <p className="card-text strong">Revenue : </p>
              <p>{e.revenue}</p>
            </div>
          </div>
        </div>
    )
  )}

  //Redux DELETE_COMPANY
  deleteCompany(e, id){
    e.preventDefault();
    this.props.deleteCompany(id)
    this.refresh()
  }
  
  refresh() {
    fetch('http://localhost:8000/API/forms/company/', {
        method: "GET"
      })
  }

  render() {
    return (
      <div>
         {this.companyCardLoop()}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCompany: id =>dispatch({type: 'DELETE_COMPANY', id })
  }
};
const mapStateToProps = (state) => {
  return {
    company: state.company
  };
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CardBoard));
