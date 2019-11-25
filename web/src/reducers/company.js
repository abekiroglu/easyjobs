import { LOGIN_COMPANY, GET_ME } from '../constants/actionTypes';

const initialState = {};

export default function companyReducer(state = initialState, action) {
    debugger;
    switch (action.type) {
        case LOGIN_COMPANY.REQUEST:
            return {
                ...state
            };
        case LOGIN_COMPANY.SUCCESS:
            return {
                ...state,
                user: action.response.user
            };
        case LOGIN_COMPANY.FAILURE:
            return {
                ...state,
                error: action.error.message
            };
        
        case GET_ME.REQUEST:
            return {
                ...state,
                isLoading: true,
                hasError: false
            };
        case GET_ME.SUCCESS:
            return {
                ...state,
                company: action.response.data,
                isLoading: false
            };
        case GET_ME.FAILURE:
            return {
                ...state,
                error: action.error,
                isLoading: false,
                hasError: true
            };

        default:
            return state;
    }
}
