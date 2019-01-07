import React, { Component } from 'react';
import CardBoardCompDetail from "../cardboards/CardBoardCompDetail"
import CardBoardOffice from "../cardboards/CardBoardOffice"
import { connect } from "react-redux";
import { getOffice } from "../../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    getOffice: office => dispatch(getOffice(office))
  };
}

class OverviewPage extends Component {
 constructor(props){
  super(props)
  this.state = {
   officeList: [],
   show:false,
   params: this.props.match.params.company
  }
  console.log(this.state.officeList)
}


  componentWillMount(){
    this.fetchOffice()
  }

  // Get spesific office in current company
  fetchOffice() {
    fetch('http://localhost:8000/API/forms/company/' + this.state.params + '/office', {
        method: "GET"
      })
      .then(res => res.json())
      .then(res => {

        this.props.getOffice(res.Officeform)

        //Store response json to this state
        this.setState({
          officeList: res.Officeform
        })
        console.log(res.Officeform)

        //Checking for if there is office or not
        if(this.state.officeList.length !== 0){
          this.setState ({
          show : true
            })
          }
        })

  }
  
  render() {
    const Blank =  <p className='blank text-center'>There is no office created yet</p>
    
    return (
        <div className="detail-page">
       <CardBoardCompDetail params={this.state.params}/>

       <hr></hr>
        <h1 className='text-left'>Offices List</h1>
        { this.state.show ?
             <CardBoardOffice params={this.state.params}/> :  Blank}
      
      </div>
    );
  }
}


const Company = connect(null, mapDispatchToProps)(OverviewPage);
export default Company;
