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

  handleDelete(id) {
    const { deleteOffice } = this.props;
    fetch('http://localhost:8000/API/forms/company/' +this.props.params + '/office/' + id, {
        method: "DELETE"  
      })
      // .then(res => res.json())
      .then((res) => {
        if (res.ok) {
            this.fetchOffice();
        }
        console.log(res.json)
    })
      .then(() => deleteOffice(id))
      
      
      }

  deleteOffice(e, id){
        e.preventDefault();
        this.props.deleteOffice(id)
        // .then(() => this.fetchOffice())
    
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
         <div className="icon-exit"><button type="button" className="icon-x close" onClick={() => this.handleDelete(e.officeId)} aria-label="Close">
          <span aria-hidden="true">&times;</span>
          </button>
      </div>
          <div className="office card">
            <div className="card-header">
              <h3>{e.name}</h3>
            </div>
            <div className="card-body">
              <p className="card-text">Location :</p>
              <p className="card-text">Lat : <span>{e.latitude}</span></p>
              <p className="card-text">Log : <span>{e.longitude}</span></p>
              <p className="card-text">Office Start Date: <span>{e.startDate}</span></p>
            </div>
          </div>
        </div>
    )
  )}
  

  render() {
    console.log(this.state)
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
