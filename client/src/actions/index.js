import { 
    ADD_COMPANY, 
    ADD_OFFICE,
    GET_COMPANY,
    GET_OFFICE,

    DELETE_COMPANY,
    DELETE_OFFICE
  
} from "../constants/action-types";


export const addCompany = company => ({ type: ADD_COMPANY, payload: company });
export const addOffice = office => ({ type: ADD_OFFICE, payload: office });

export const getCompany = company => ({ type: GET_COMPANY, payload: company });
export const getOffice = office => ({ type: GET_OFFICE, payload: office });

export const deleteCompany = company => ({ type: DELETE_COMPANY, payload: company });
export const deleteOffice = office => ({ type: DELETE_OFFICE, payload: office });
