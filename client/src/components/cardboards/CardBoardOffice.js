import React, { Component } from 'react';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";


class CardBoard extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentOffice : []
    }
  }

  // Delete office with fetch delete API
  handleDelete(id) {
    const { deleteOffice } = this.props;
    fetch('http://localhost:8000/API/forms/company/' +this.props.params + '/office/' + id, {
        method: "DELETE"  
      })
      // Refresh data after delete
      .then((res) => {
        if (res.ok) {
            this.fetchOffice();
        }
    })
      .then(() => deleteOffice(id))
      
      
      }
  
  // Redux DELETE_OFFICE
  deleteOffice(e, id){
        e.preventDefault();
        this.props.deleteOffice(id)    
      }

  componentDidMount() {
    this.fetchOffice()
  }

  fetchOffice() {
    fetch('http://localhost:8000/API/forms/company/' + this.props.params + '/office', {
        method: "GET"
      })
      .then(res => res.json())
      .then(res => {

        //Store response json to this state
        this.setState({
          currentOffice: res.Officeform
        })
        console.log(res.Officeform)
      })

  }


  companyCardLoop(){
    let data = this.state.currentOffice;
    return data.map(e => (
        <div className="box-card col-sm-6" key={e.officeId}>
         <div className="icon-exit"><button type="button" className="icon-x close" onClick={() => { if (window.confirm('Are you sure want to delete this office?')) this.handleDelete(e.officeId) }} aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>
          <div className="office card">
            <div className="card-header">
              <h3>{e.name}</h3>
            </div>
            <div className="card-body">
              <p className="card-text"><b>Location :</b></p>
              <p className="card-text loc"><b>Latitude : </b><span>{e.latitude}</span></p>
              <p className="card-text loc"><b>Longitude : </b><span>{e.longitude}</span></p>
              <p className="card-text"><b>Office Start Date: </b><span>{e.startDate}</span></p>
            </div>
          </div>
        </div>
    )
  )}
  

  render() {
    console.log(this.state.currentOffice)
    return (
      <div>
         {this.companyCardLoop()}
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    deleteOffice: id =>dispatch({type: 'DELETE_OFFICE', id })
  }
};

const mapStateToProps = (state) => {
  return {
    company: state.company
  };
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CardBoard));
