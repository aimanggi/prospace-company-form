import React, { Component } from 'react';
import CardBoardCompDetail from "../cardboards/CardBoardCompDetail"
import CardBoardOffice from "../cardboards/CardBoardOffice"
import { connect } from "react-redux";
import { getCompany } from "../../actions/index";

function mapDispatchToProps(dispatch) {
  return {
    getOffice: company => dispatch(getCompany(company))
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
    //Checking for if there is company or not
    if(this.props.office.length !== 0){
      this.setState ({
        show : true
      })
    }
  }
  
  render() {
    console.log(this.state.show)
    console.log(this.props)
    const Blank =  <p className='blank text-center'>There is no office created yet</p>
    
    return (
        <div className="detail-page">
       <CardBoardCompDetail params={this.state.params}/>

       <hr></hr>
        <h1 className='text-left'>Office List</h1>
        { this.state.show ?
             <CardBoardOffice params={this.state.params}/> :  Blank}
      
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    office: state.office
  };
}

const Company = connect(mapStateToProps,  mapDispatchToProps)(OverviewPage);
export default Company;
