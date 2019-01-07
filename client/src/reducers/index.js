import { ADD_COMPANY, ADD_OFFICE, GET_COMPANY, GET_OFFICE, DELETE_COMPANY, DELETE_OFFICE } from "../constants/action-types";
const initialState = {
  company: [],
  office:[],

};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Handle Submit
    case ADD_COMPANY:
      return { ...state, company: state.company.concat(action.payload)};
    case ADD_OFFICE:
    return { ...state, office: state.office.concat(action.payload)};
    
    case GET_COMPANY:
      return { ...state, company: action.payload};  
    case GET_OFFICE:
      return { ...state, office: action.payload};

    case DELETE_COMPANY:
    return { ...state, company: state.company.filter(company =>
      company.companyId !== action.id)};

    case DELETE_OFFICE:
      return { ...state, office: state.office.filter(office =>
        office.officeId !== action.id)};

    default:
      return state;
  }
};
export default rootReducer;